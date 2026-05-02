import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-16 text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Becoming Him
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          Thoughts, lessons, and stories on the journey of growth and
          self-improvement.
        </p>
        <Link
          href="/blogs"
          className="inline-block mt-4 px-6 py-3 bg-white text-zinc-950 font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Read the Blog
        </Link>
      </section>
    </div>
  );
}
