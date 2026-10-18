import Link from "next/link";
import { Nav } from "../components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-col w-full min-h-screen bg-background items-center justify-center selection:bg-accent selection:text-white px-6 text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-4">404</h1>
        <p className="font-hand text-2xl md:text-3xl text-accent -rotate-2 mb-8">
          This page didn't survive the merge.
        </p>
        <Link 
          href="/"
          className="font-mono text-sm uppercase tracking-widest text-olive border-b border-olive pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          Return Home
        </Link>
      </main>
    </>
  );
}
