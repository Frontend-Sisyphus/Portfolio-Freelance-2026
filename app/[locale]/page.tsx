import ThePageWrapper from "@/widgets/ThePageWrapper";
import Greetings from "@/widgets/Greetings";
import About from "@/widgets/About";
import Impact from "@/widgets/Impact";
import Work from "@/widgets/Work";
import Tools from "@/widgets/Tools";
import Projects from "@/widgets/Projects";
import Contacts from "@/widgets/Contacts";

export default function Home() {
  return (
    <ThePageWrapper>
      <main>
        <Greetings />

        <About />

        <Impact />

        <Work />

        <Tools />

        <Projects />

        <Contacts />
      </main>
    </ThePageWrapper>
  );
}
