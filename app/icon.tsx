import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          color: "#d7ff3f",
          fontSize: 180,
          fontWeight: 700,
          letterSpacing: "-0.08em",
          textTransform: "uppercase",
          border: "24px solid #d7ff3f",
        }}
      >
        FS
      </div>
    ),
    size
  );
}
