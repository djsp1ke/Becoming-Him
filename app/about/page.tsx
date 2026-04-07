import Link from 'next/link';

const aboutImages = [
  '/images/james3.png',
  '/images/james2.png',
  '/images/james1.png',
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#111111] px-5 py-12">
      <nav className="flex items-center justify-between mb-10 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
        <div>
          <p className="text-xs tracking-widest text-slate-500 font-medium uppercase">Becoming Him</p>
          <p className="text-sm text-slate-500">James Gaunt</p>
        </div>
        <Link href="/" className="text-sm text-slate-700 border border-slate-200 rounded-lg bg-white px-4 py-2 hover:bg-slate-50 transition">
          Home
        </Link>
      </nav>

      <section className="max-w-3xl bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <p className="text-xs tracking-widest text-slate-500 font-medium uppercase mb-4">My story</p>
        <h1 className="text-3xl font-bold mb-6 text-[#111111]">A life remade through discipline and honesty</h1>
        <div className="grid gap-3 mb-8 sm:grid-cols-3">
          {aboutImages.map((src, index) => (
            <div key={src} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <img
                src={src}
                alt={`James Gaunt ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          I'm James. 45 years old, from Morley, West Yorkshire. I've been addicted, abused, bullied, manipulated, mistreated, misunderstood, betrayed and humiliated. I've also been mischievous, confused, amused, creative and forgiven. All of it, in what feels like a blink.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          I spent years lost to gambling, alcohol, cocaine and weed. Two years ago I put down the alcohol and the coke. Wednesday 9th April I go fully substance free — cigarettes, weed, all of it — on day one of 75 Hard.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          I'm not here to perform a recovery story. I'm here because I got tired of waiting to be saved. Nobody's coming. Not Clark Kent. Not Peter Parker. Just you, in the mirror, every single morning.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          So that's what I'm doing. Showing up. Working through it. Building something harder than I've ever built before — myself.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          Over the next 75 days I'm going to share the things that made me who I am. The trials. The humiliations. The moments I'm not proud of. Because somewhere out there is someone living a version of my story, and I want them to know they're not alone — and more importantly, that there's a way through.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          This is me becoming him. The man I'm supposed to be.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          I'm just getting started.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          I was a Slimming World Man of the Year finalist, and I learned to hold myself accountable by doing hard things in public. My next goal is to complete 75 Hard again and document every day honestly.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          This site is where I share what works, what doesn't and how I'm staying disciplined without pretending it is easy.
        </p>
      </section>
    </main>
  );
}
