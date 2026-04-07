import Image from 'next/image';
import content from '../content/homepage.json';

type Pillar = {
  title: string;
  body: string;
};

type SocialLink = {
  name: string;
  url: string;
  src: string;
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#111111]">
      <nav className="flex justify-between items-center px-5 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <span className="text-sm font-semibold tracking-widest">Becoming Him</span>
        <span className="text-xs text-slate-500">James Gaunt</span>
      </nav>

      <section className="px-5 py-8">
        <p className="text-xs tracking-widest text-slate-500 font-medium uppercase mb-4">Find me</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {(
            [
              { name: 'TikTok', url: 'https://tiktok.com/@jamesgaunt97', src: '/logos/tiktok.png' },
              { name: 'Instagram', url: 'https://instagram.com/jamesgaunt97', src: '/logos/insta.png' },
              { name: 'YouTube', url: 'https://youtube.com/@jamesgaunt2987', src: '/logos/youtube.png' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/james-gaunt-a-m-w-m-soc-08a782b2/', src: '/logos/linkedin.png' },
              { name: 'Facebook', url: 'https://facebook.com/djsp1ke', src: '/logos/facebook.png' },
            ] as SocialLink[]
          ).map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white p-1 transition hover:border-black"
            >
              <div className="relative h-full w-full rounded-3xl bg-white p-2">
                <Image src={s.src} alt={s.name} fill className="object-contain" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 mx-5" />

      <section className="px-5 pt-12 pb-10">
        <p className="text-xs tracking-widest text-slate-500 font-medium mb-3 uppercase">James Gaunt</p>
        <h1 className="text-4xl font-bold leading-tight mb-4 text-[#111111]">
          {content.headline.split('in public.')[0]}
          <span className="text-[#111111]">in public.</span>
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed mb-8">{content.tagline}</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#email" className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg">
            Follow the journey
          </a>
          <a href="/about" className="text-slate-700 text-sm px-5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition">
            My story
          </a>
        </div>
      </section>

      <hr className="border-slate-200 mx-5" />

      <section className="px-5 py-8">
        <p className="text-xs tracking-widest text-slate-500 font-medium uppercase mb-4">My story</p>
        <p className="text-sm text-slate-700 leading-relaxed">{content.story}</p>
      </section>

      <hr className="border-slate-200 mx-5" />

      <section className="px-5 py-8">
        <p className="text-xs tracking-widest text-slate-500 font-medium uppercase mb-4">What I talk about</p>
        <div className="grid gap-3 md:grid-cols-3">
          {content.pillars.map((p: Pillar, i: number) => (
            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#111111] mb-1">{p.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 mx-5" />

      <section id="email" className="px-5 py-8">
        <p className="text-xs tracking-widest text-slate-500 font-medium uppercase mb-3">Join the journey</p>
        <h2 className="text-lg font-semibold mb-2 text-[#111111]">One honest email a week.</h2>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          What I did, what worked, what didn't. No highlights reel.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-[#111111] placeholder-slate-400 mb-3 outline-none focus:border-black"
        />
        <button className="w-full bg-black text-white font-medium py-3 rounded-lg text-sm">
          Count me in
        </button>
      </section>

      <footer className="px-5 py-6 border-t border-slate-200 text-center text-[11px] text-slate-500">
        Becoming Him · James Gaunt · Morley, West Yorkshire
      </footer>
    </main>
  );
}
