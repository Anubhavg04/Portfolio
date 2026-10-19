import { content } from "../../data/content";
import { Hero } from "../components/sections/Hero";
import { Work } from "../components/sections/Work";
import { Stack } from "../components/sections/Stack";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Nav } from "../components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex flex-col w-full selection:bg-accent selection:text-white">
        <Hero content={content.hero} />
        <Work projects={content.projects} />
        <Stack data={content.stack} />
        <About content={content.about} />
        <Contact content={content.contact} />
      </main>
    </>
  );
}
