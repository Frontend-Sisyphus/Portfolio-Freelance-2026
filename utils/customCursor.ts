import { initialCursorOptions } from "@/utils/cursor.config";

type RGB = { r: number; g: number; b: number };

export type CursorOptions = {
  color: string | string[];
  opacity: number;
  size: number;
  focusableElements: string;
  focusableElementsOffsetX: number;
  focusableElementsOffsetY: number;
  zIndex: number;
  invert: boolean;
  dotColor: string | null;
  dotSize: number;
  magnetic: boolean;
  mode: "normal" | "bouncy" | "slow";
  radius: number;
  font: string;
  fontWeight: number;
  fontSize: number;
  fontColor: string;
  tooltipPadding: number;
  kineticMorphing: boolean;
};

type SpringInstance = {
  current: number;
  target: number;
  velocity: number;
  acceleration: number;
  friction: number;
};

const DEFAULT_CURSOR_OPTIONS: CursorOptions = {
  color: "rgb(180, 180, 180)",
  opacity: 1,
  size: 40,
  focusableElements:
    "[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",
  focusableElementsOffsetX: 0,
  focusableElementsOffsetY: 0,
  zIndex: -1,
  invert: false,
  dotColor: null,
  dotSize: 8,
  magnetic: true,
  mode: "normal",
  radius: 0,
  font: "sans-serif",
  fontWeight: 400,
  fontSize: 40,
  fontColor: "#000000",
  tooltipPadding: 12,
  kineticMorphing: true,
};

const KINET_PRESETS = {
  normal: { acceleration: 0.1, friction: 0.35 },
  bouncy: { acceleration: 0.1, friction: 0.28 },
  slow: { acceleration: 0.06, friction: 0.35 },
};

function throttle<T extends (...args: never[]) => void>(fn: T, ms = 16): T {
  let last = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: Parameters<T> | null = null;

  return ((...args: Parameters<T>) => {
    pendingArgs = args;
    const now = Date.now();

    if (now - last >= ms) {
      last = now;
      fn(...args);
      pendingArgs = null;
      return;
    }

    if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        last = Date.now();
        if (pendingArgs) {
          fn(...pendingArgs);
          pendingArgs = null;
        }
      }, ms - (now - last));
    }
  }) as T;
}

function convertColor(color: string): RGB {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;

    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16),
    };
  }

  const match = color.match(/\d+/g);
  if (match && match.length >= 3) {
    return {
      r: Number(match[0]),
      g: Number(match[1]),
      b: Number(match[2]),
    };
  }

  return { r: 180, g: 180, b: 180 };
}

function positive(value: number) {
  return Math.max(0, value);
}

class SpringAnimator {
  private readonly instances: Record<string, SpringInstance> = {};
  private readonly tickListeners: Array<
    (instances: Record<string, { current: number; velocity: number }>) => void
  > = [];
  private readonly endListeners: Array<
    (instances: Record<string, { current: number; velocity: number }>) => void
  > = [];
  private rafId: number | null = null;

  constructor(
    names: string[],
    acceleration: number,
    friction: number,
    overrides: Partial<Record<string, { acceleration: number; friction: number }>> = {}
  ) {
    for (const name of names) {
      const override = overrides[name];
      this.instances[name] = {
        current: 0,
        target: 0,
        velocity: 0,
        acceleration: override?.acceleration ?? acceleration,
        friction: override?.friction ?? friction,
      };
    }

    this.start();
  }

  private tick = () => {
    for (const instance of Object.values(this.instances)) {
      const force = (instance.target - instance.current) * instance.acceleration;
      instance.velocity = (instance.velocity + force) * (1 - instance.friction);
      instance.current += instance.velocity;
    }

    const payload = Object.fromEntries(
      Object.entries(this.instances).map(([name, instance]) => [
        name,
        { current: instance.current, velocity: instance.velocity },
      ])
    );

    this.tickListeners.forEach((listener) => listener(payload));

    const isSettled = Object.values(this.instances).every(
      (instance) =>
        Math.abs(instance.target - instance.current) < 0.01 &&
        Math.abs(instance.velocity) < 0.01
    );

    if (isSettled) {
      this.endListeners.forEach((listener) => listener(payload));
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  set(name: string, value: number) {
    const instance = this.instances[name];
    instance.current = value;
    instance.target = value;
    instance.velocity = 0;
  }

  animate(name: string, value: number) {
    this.instances[name].target = value;
  }

  on(
    event: "tick" | "end",
    listener: (instances: Record<string, { current: number; velocity: number }>) => void
  ) {
    if (event === "tick") {
      this.tickListeners.push(listener);
      return;
    }

    this.endListeners.push(listener);
  }

  updatePreset(mode: CursorOptions["mode"]) {
    const preset = KINET_PRESETS[mode];
    Object.entries(this.instances).forEach(([name, instance]) => {
      if (name === "scale") {
        return;
      }

      instance.friction = preset.friction;
      instance.acceleration = preset.acceleration;
    });
  }
}

class Magnetic {
  private readonly kinetInstance: SpringAnimator;
  private readonly throttledMouseMove: (event: MouseEvent) => void;
  private readonly element: HTMLElement;
  private readonly center: { x: number; y: number };
  private readonly maxDistanceX: number;
  private readonly maxDistanceY: number;
  private destroying = false;
  public onTick: (() => void) | null = null;

  constructor(element: HTMLElement) {
    this.kinetInstance = new SpringAnimator(["x", "y"], 0.1, 0.4);
    this.element = element;

    const rect = this.element.getBoundingClientRect();
    this.center = {
      x: rect.x + window.scrollX + this.element.offsetWidth / 2,
      y: rect.y + window.scrollY + this.element.offsetHeight / 2,
    };

    this.maxDistanceX = this.element.offsetWidth / 2;
    this.maxDistanceY = this.element.offsetWidth / 2;

    this.throttledMouseMove = throttle(this.mouseMove);
    window.addEventListener("mousemove", this.throttledMouseMove, { passive: true });

    this.kinetInstance.on("tick", (instances) => {
      this.element.style.transform = `translate3d(${instances.x.current}px, ${instances.y.current}px, 0) rotateY(${instances.x.current / 2}deg) rotateX(${instances.y.current / 2}deg)`;
      this.onTick?.();
    });

    this.kinetInstance.on("end", () => {
      if (this.destroying) {
        this.element.style.transform = "";
      }
    });
  }

  destroy = () => {
    window.removeEventListener("mousemove", this.throttledMouseMove);
    this.destroying = true;
    this.kinetInstance.animate("x", 0);
    this.kinetInstance.animate("y", 0);
  };

  private mouseMove = (event: MouseEvent) => {
    this.render(
      -1 * (this.center.x - event.clientX - window.scrollX),
      -1 * (this.center.y - event.clientY - window.scrollY)
    );
  };

  private render(x: number, y: number) {
    if (Math.abs(x) < this.maxDistanceX && Math.abs(y) < this.maxDistanceY) {
      const percentX = x / this.maxDistanceX;
      const percentY = y / this.maxDistanceY;

      this.kinetInstance.animate("x", Math.round(20 * percentX));
      this.kinetInstance.animate("y", Math.round(20 * percentY));
      return;
    }

    this.kinetInstance.animate("x", 0);
    this.kinetInstance.animate("y", 0);
  }
}

export class CustomCursor {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly kinetInstance: SpringAnimator;
  private readonly throttledMouseMove: (event: MouseEvent) => void;
  private options: CursorOptions;
  private color: RGB | RGB[] = { r: 0, g: 0, b: 0 };
  private fontColor: RGB = { r: 0, g: 0, b: 0 };
  private initialized = false;
  private stickedToElement: HTMLElement | null = null;
  private stickedToElementTooltip: string | null = null;
  private disablingStickedToElementTimeout: ReturnType<typeof setTimeout> | null = null;
  private isActive = true;
  private globalStyles?: HTMLStyleElement;
  private destroyed = false;
  private currentMagnetic: Magnetic | null = null;
  private lastKnownCoordinates = { x: 0, y: 0 };
  private currentOffsetX = 0;
  private currentOffsetY = 0;
  private manuallySetFocusedElement: HTMLElement | null = null;
  private manuallySetTooltipText: string | null = null;
  private disableTimeStamp = Date.now();
  private prefersReducedMotionMediaQuery: MediaQueryList;
  private reduceMotionSetting = false;
  private kinetDefaultMethod: "animate" | "set" = "animate";
  private readonly stickedToElementMutationObserver: MutationObserver;

  constructor(options?: Partial<CursorOptions>) {
    this.options = {
      ...DEFAULT_CURSOR_OPTIONS,
      ...initialCursorOptions,
      ...options,
    };

    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;

    this.kinetInstance = new SpringAnimator(
      ["x", "y", "opacity", "textOpacity", "width", "height", "radius", "scale"],
      KINET_PRESETS[this.options.mode].acceleration,
      KINET_PRESETS[this.options.mode].friction,
      {
        scale: { acceleration: 0.06, friction: 0.1 },
      }
    );

    this.updateOptions({});
    this.kinetInstance.set("x", window.innerWidth / 2);
    this.kinetInstance.set("y", window.innerHeight / 2);
    this.kinetInstance.set("width", this.options.size);
    this.kinetInstance.set("height", this.options.size);
    this.kinetInstance.set("opacity", 0);
    this.kinetInstance.set("textOpacity", 0);
    this.kinetInstance.set("radius", this.options.size / 2);
    this.kinetInstance.set("scale", 100);

    this.kinetInstance.on("tick", (instances) => {
      this.render(
        instances.x.current,
        instances.y.current,
        instances.width.current,
        instances.height.current,
        instances.radius.current,
        instances.x.velocity,
        instances.y.velocity,
        instances.opacity.current,
        instances.scale.current,
        instances.textOpacity.current
      );
    });

    this.throttledMouseMove = throttle(this.mouseMove);

    window.addEventListener("resize", this.resize, { passive: true });
    this.resize();

    window.addEventListener("mousemove", this.throttledMouseMove, { passive: true });
    document.addEventListener("mouseenter", this.windowMouseEnter);
    document.addEventListener("mouseleave", this.windowMouseLeave);
    document.addEventListener("mouseover", this.focusableElementMouseEnter);
    document.addEventListener("mouseout", this.focusableElementMouseLeave);
    document.addEventListener("mousedown", this.mouseDown);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("touchstart", this.disable);
    document.addEventListener("touchend", this.disable);
    document.addEventListener("mousemove", this.enable, { passive: true });

    this.prefersReducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.prefersReducedMotionMediaQuery.addEventListener("change", this.updatePrefersReducedMotionSetting);
    this.updatePrefersReducedMotionSetting();

    this.stickedToElementMutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.removedNodes) {
          if (
            node === this.stickedToElement ||
            (node instanceof Element && this.stickedToElement && node.contains(this.stickedToElement))
          ) {
            this.resetStickedToElement();
            this.resetStickedToElementMutationObserver();
            this.resetMagnetic();
            this.reset();
          }
        }
      }
    });
  }

  updateOptions = (newOptions: Partial<CursorOptions>) => {
    this.options = {
      ...this.options,
      ...newOptions,
    };

    if (Array.isArray(this.options.color)) {
      this.color = this.options.color.map((value) => convertColor(value));
    } else {
      this.color = convertColor(this.options.color);
    }

    this.fontColor = convertColor(this.options.fontColor);

    if (this.options.invert) {
      this.color = convertColor("rgb(255, 255, 255)");
    }

    if (this.options.dotColor) {
      if (this.globalStyles) {
        document.head.removeChild(this.globalStyles);
        this.globalStyles = undefined;
      }

      const dot = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.options.dotSize}" height="${this.options.dotSize}"><circle cx="${this.options.dotSize / 2}" cy="${this.options.dotSize / 2}" r="${this.options.dotSize / 2}" fill="${this.options.dotColor}"/></svg>`;

      this.globalStyles = document.createElement("style");
      this.globalStyles.setAttribute("data-custom-cursor-global-styles", "");
      this.globalStyles.appendChild(document.createTextNode("* {cursor: inherit}"));
      this.globalStyles.appendChild(
        document.createTextNode(
          `html { cursor: url(data:image/svg+xml;base64,${btoa(dot)}) ${this.options.dotSize / 2} ${this.options.dotSize / 2}, auto;}`
        )
      );
      document.head.appendChild(this.globalStyles);
    } else if (this.globalStyles) {
      document.head.removeChild(this.globalStyles);
      this.globalStyles = undefined;
    }

    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      will-change: transform;
      overflow: visible;
      opacity: ${this.options.opacity};
      z-index: ${this.options.invert ? 2147483647 : this.options.zIndex};
      ${this.options.invert ? "mix-blend-mode: difference;" : ""}
    `;

    this.currentOffsetX = this.options.focusableElementsOffsetX;
    this.currentOffsetY = this.options.focusableElementsOffsetY;
    this.kinetInstance.updatePreset(this.options.mode);
    this.resize();

    if (!this.stickedToElement && !this.stickedToElementTooltip) {
      if (newOptions.radius !== undefined) {
        this.kinetInstance[this.kinetDefaultMethod]("radius", this.options.radius);
      }

      this.kinetInstance[this.kinetDefaultMethod]("width", this.options.size);
      this.kinetInstance[this.kinetDefaultMethod]("height", this.options.size);
      this.kinetInstance[this.kinetDefaultMethod](
        "x",
        this.lastKnownCoordinates.x - this.options.size / 2
      );
      this.kinetInstance[this.kinetDefaultMethod](
        "y",
        this.lastKnownCoordinates.y - this.options.size / 2
      );
    }
  };

  bounce() {
    if (this.reduceMotionSetting) {
      this.kinetInstance.set("scale", 100);
      return;
    }

    this.kinetInstance.set("scale", 97);
    this.kinetInstance.animate("scale", 100);
  }

  destroy = () => {
    if (this.destroyed) {
      return;
    }

    window.removeEventListener("resize", this.resize);
    window.removeEventListener("mousemove", this.throttledMouseMove);
    document.removeEventListener("mouseenter", this.windowMouseEnter);
    document.removeEventListener("mouseleave", this.windowMouseLeave);
    document.removeEventListener("mouseover", this.focusableElementMouseEnter);
    document.removeEventListener("mouseout", this.focusableElementMouseLeave);
    document.removeEventListener("touchstart", this.disable);
    document.removeEventListener("touchend", this.disable);
    document.removeEventListener("mousemove", this.enable);
    document.removeEventListener("mousedown", this.mouseDown);
    document.removeEventListener("mouseup", this.mouseUp);
    this.prefersReducedMotionMediaQuery.removeEventListener(
      "change",
      this.updatePrefersReducedMotionSetting
    );

    this.kinetInstance.stop();
    this.resetMagnetic();
    document.body.removeChild(this.canvas);

    if (this.globalStyles) {
      document.head.removeChild(this.globalStyles);
    }

    this.destroyed = true;
  };

  focusElement = (element: HTMLElement) => {
    this.manuallySetTooltipText = null;
    this.manuallySetFocusedElement = element;
    this.highlightElement(element);
  };

  showTooltip = (text: string) => {
    this.manuallySetFocusedElement = null;
    this.manuallySetTooltipText = text;
    this.displayTooltip(text, this.lastKnownCoordinates.x, this.lastKnownCoordinates.y);
  };

  reset = () => {
    this.manuallySetFocusedElement = null;
    this.manuallySetTooltipText = null;

    if (this.activeTooltip) {
      this.displayTooltip(
        this.activeTooltip,
        this.lastKnownCoordinates.x,
        this.lastKnownCoordinates.y
      );
      return;
    }

    if (this.activeFocusedElement) {
      this.highlightElement(this.activeFocusedElement);
      return;
    }

    this.resetMorph(
      this.lastKnownCoordinates.x - this.options.size / 2,
      this.lastKnownCoordinates.y - this.options.size / 2
    );
  };

  private disable = () => {
    this.disableTimeStamp = Date.now();
    this.isActive = false;
    this.clear();
  };

  private enable = () => {
    const disableAge = Date.now() - this.disableTimeStamp;

    if (disableAge > 16) {
      this.isActive = true;
    }
  };

  private updatePrefersReducedMotionSetting = () => {
    this.reduceMotionSetting = this.prefersReducedMotionMediaQuery.matches;
    this.kinetDefaultMethod = this.reduceMotionSetting ? "set" : "animate";
  };

  private get activeTooltip() {
    return this.manuallySetTooltipText || this.stickedToElementTooltip;
  }

  private get activeFocusedElement() {
    return this.manuallySetFocusedElement || this.stickedToElement;
  }

  private focusableElementMouseEnter = (event: MouseEvent) => {
    if (!this.isActive || !event.target) {
      return;
    }

    const element = (event.target as HTMLElement).closest(
      this.options.focusableElements
    ) as HTMLElement | null;

    if (!element) {
      return;
    }

    this.stickedToElement = element;
    const tooltip = element.getAttribute("data-blobity-tooltip");

    if (tooltip != null) {
      this.stickedToElementTooltip = tooltip;
    }

    this.currentOffsetX = element.getAttribute("data-blobity-offset-x")
      ? parseInt(String(element.getAttribute("data-blobity-offset-x")), 10)
      : this.options.focusableElementsOffsetX;
    this.currentOffsetY = element.getAttribute("data-blobity-offset-y")
      ? parseInt(String(element.getAttribute("data-blobity-offset-y")), 10)
      : this.options.focusableElementsOffsetY;

    this.stickedToElementMutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const magnetic = element.getAttribute("data-blobity-magnetic");
    if (this.reduceMotionSetting) {
      return;
    }

    if (magnetic === "true" || (this.options.magnetic && magnetic !== "false")) {
      this.currentMagnetic = new Magnetic(element);
      this.currentMagnetic.onTick = () => {
        if (!this.activeTooltip && this.activeFocusedElement === element) {
          const { width, height, x, y } = element.getBoundingClientRect();

          this.kinetInstance[this.kinetDefaultMethod]("textOpacity", 0);
          this.morph(
            {
              width: width + this.currentOffsetX * 2,
              height: height + this.currentOffsetY * 2,
              x: x - this.currentOffsetX,
              y: y - this.currentOffsetY,
            },
            0
          );
        }
      };
    }
  };

  private focusableElementMouseLeave = (event: MouseEvent) => {
    if (!event.target) {
      return;
    }

    const element = (event.target as HTMLElement).closest(
      this.options.focusableElements
    ) as HTMLElement | null;

    if (!element) {
      return;
    }

    this.resetStickedToElement();
    this.resetStickedToElementMutationObserver();
    this.currentOffsetX = this.options.focusableElementsOffsetX;
    this.currentOffsetY = this.options.focusableElementsOffsetY;
    this.resetMagnetic();
    this.resetMorph(event.clientX, event.clientY);
  };

  private mouseDown = () => {
    this.kinetInstance[this.kinetDefaultMethod]("scale", 97);
  };

  private mouseUp = () => {
    this.bounce();
  };

  private windowMouseEnter = () => {
    this.kinetInstance[this.kinetDefaultMethod]("opacity", 1);
  };

  private windowMouseLeave = () => {
    this.kinetInstance[this.kinetDefaultMethod]("opacity", 0);
  };

  private highlightElement = (element: HTMLElement) => {
    const { width, height, x, y } = element.getBoundingClientRect();

    this.kinetInstance[this.kinetDefaultMethod]("textOpacity", 0);
    this.morph(
      {
        width: width + this.currentOffsetX * 2,
        height: height + this.currentOffsetY * 2,
        x: x - this.currentOffsetX,
        y: y - this.currentOffsetY,
      },
      0
    );
  };

  private displayTooltip = (text: string, x: number, y: number) => {
    this.ctx.font = `${this.options.fontWeight} ${this.options.fontSize}px ${this.options.font}`;
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = "left";
    const { actualBoundingBoxAscent, width } = this.ctx.measureText(text);
    const padding = this.options.tooltipPadding * 2;

    this.kinetInstance[this.kinetDefaultMethod]("textOpacity", 100);
    this.morph(
      {
        x: x + 6,
        y: y + 6,
        width: width + padding,
        height: actualBoundingBoxAscent + padding,
      },
      4
    );
  };

  private mouseMove = (event: MouseEvent) => {
    if (this.initialized) {
      this.lastKnownCoordinates = {
        x: event.clientX,
        y: event.clientY,
      };

      if (this.activeTooltip) {
        this.displayTooltip(this.activeTooltip, event.clientX, event.clientY);
      } else if (this.activeFocusedElement) {
        this.highlightElement(this.activeFocusedElement);
      } else {
        this.kinetInstance[this.kinetDefaultMethod]("textOpacity", 0);
        this.kinetInstance[this.kinetDefaultMethod]("x", event.clientX - this.options.size / 2);
        this.kinetInstance[this.kinetDefaultMethod]("y", event.clientY - this.options.size / 2);
        this.kinetInstance[this.kinetDefaultMethod]("width", this.options.size);
        this.kinetInstance[this.kinetDefaultMethod]("height", this.options.size);
        this.kinetInstance[this.kinetDefaultMethod]("radius", this.options.size / 2);
      }

      return;
    }

    this.initialized = true;
    this.kinetInstance.set("x", event.clientX - this.options.size / 2);
    this.kinetInstance.set("y", event.clientY - this.options.size / 2);
    this.kinetInstance[this.kinetDefaultMethod]("opacity", 1);
  };

  private morph(
    {
      width,
      height,
      x,
      y,
    }: {
      width: number;
      height: number;
      x: number;
      y: number;
    },
    radius: number
  ) {
    if (this.disablingStickedToElementTimeout) {
      clearTimeout(this.disablingStickedToElementTimeout);
    }

    this.kinetInstance[this.kinetDefaultMethod]("radius", radius);
    this.kinetInstance[this.kinetDefaultMethod]("width", width);
    this.kinetInstance[this.kinetDefaultMethod]("height", height);
    this.kinetInstance[this.kinetDefaultMethod]("x", x);
    this.kinetInstance[this.kinetDefaultMethod]("y", y);
  }

  private resetMorph = (x: number, y: number) => {
    this.disablingStickedToElementTimeout = setTimeout(() => {
      this.kinetInstance[this.kinetDefaultMethod]("width", this.options.size);
      this.kinetInstance[this.kinetDefaultMethod]("height", this.options.size);
      this.kinetInstance[this.kinetDefaultMethod]("radius", this.options.size / 2);
      this.kinetInstance[this.kinetDefaultMethod]("x", x);
      this.kinetInstance[this.kinetDefaultMethod]("y", y);
    });
  };

  private clear = () => {
    this.ctx.resetTransform();
    this.ctx.rotate(0);
    this.ctx.clearRect(
      -20,
      -20,
      window.innerWidth * window.devicePixelRatio + 20,
      window.innerHeight * window.devicePixelRatio + 20
    );
  };

  private render(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    velocityX: number,
    velocityY: number,
    opacity: number,
    scale: number,
    textOpacity: number
  ) {
    this.clear();

    const maxDelta = this.activeFocusedElement ? 0 : (this.options.size / 8) * 7;

    x *= window.devicePixelRatio;
    y *= window.devicePixelRatio;
    width = (this.activeTooltip ? width : Math.max(width, maxDelta)) * window.devicePixelRatio;
    height = (this.activeTooltip ? height : Math.max(height, maxDelta)) * window.devicePixelRatio;
    radius *= window.devicePixelRatio;
    velocityX *= window.devicePixelRatio;
    velocityY *= window.devicePixelRatio;

    if (!this.isActive) {
      return;
    }

    const ctx = this.ctx;
    ctx.globalAlpha = opacity;
    ctx.setTransform(scale / 100, 0, 0, scale / 100, x, y);
    ctx.translate(width, height);
    ctx.scale(scale / 100, scale / 100);
    ctx.translate(-width, -height);

    const activateBlur =
      this.options.kineticMorphing &&
      Math.abs(width - this.options.size * window.devicePixelRatio) < 2 &&
      Math.abs(height - this.options.size * window.devicePixelRatio) < 2 &&
      Math.abs(radius - (this.options.size * window.devicePixelRatio) / 2) < 2;

    if (activateBlur) {
      const angle = (Math.atan2(velocityY, velocityX) * 180) / Math.PI + 180;

      ctx.translate(radius, radius);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.translate(-radius, -radius);
    }

    const cumulativeVelocity = activateBlur
      ? Math.min(
          Math.sqrt(Math.pow(Math.abs(velocityX), 2) + Math.pow(Math.abs(velocityY), 2)) * 2,
          60
        ) / 2
      : 0;

    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(
      width + cumulativeVelocity,
      cumulativeVelocity / 2,
      width + cumulativeVelocity,
      height + cumulativeVelocity / 2,
      positive(radius - cumulativeVelocity / 2)
    );
    ctx.arcTo(
      width + cumulativeVelocity,
      height - cumulativeVelocity / 2,
      cumulativeVelocity,
      height - cumulativeVelocity / 2,
      positive(radius - cumulativeVelocity / 2)
    );
    ctx.arcTo(0, height, 0, 0, positive(radius));
    ctx.arcTo(0, 0, width, 0, positive(radius));
    ctx.closePath();

    if (Array.isArray(this.color)) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      const colors = this.color;

      colors.forEach((color, index) => {
        gradient.addColorStop(
          (1 / (colors.length - 1)) * index,
          `rgb(${color.r}, ${color.g}, ${color.b})`
        );
      });

      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    }

    ctx.fill();

    if (this.activeTooltip) {
      ctx.setTransform(scale / 100, 0, 0, scale / 100, x, y);
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.font = `${this.options.fontWeight} ${
        this.options.fontSize * window.devicePixelRatio * (scale / 100)
      }px ${this.options.font}`;
      ctx.fillStyle = `rgba(${this.fontColor.r}, ${this.fontColor.g}, ${this.fontColor.b}, ${textOpacity / 100})`;
      ctx.fillText(
        this.activeTooltip,
        this.options.tooltipPadding * window.devicePixelRatio - ((scale - 100) / 100) * width,
        this.options.tooltipPadding * window.devicePixelRatio - ((scale - 100) / 100) * height
      );
    }
  }

  private resize = () => {
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;

    if (window.devicePixelRatio > 1) {
      this.ctx.imageSmoothingEnabled = false;
    }
  };

  private resetStickedToElement = () => {
    this.stickedToElement = null;
    this.stickedToElementTooltip = null;
  };

  private resetStickedToElementMutationObserver = () => {
    this.stickedToElementMutationObserver.disconnect();
  };

  private resetMagnetic = () => {
    if (!this.currentMagnetic) {
      return;
    }

    this.currentMagnetic.destroy();
    this.currentMagnetic.onTick = null;
    this.currentMagnetic = null;
  };
}
