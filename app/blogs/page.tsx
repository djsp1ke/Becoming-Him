import fs from 'fs';
import path from 'path';
import Link from 'next/link';

type Post = {
  title: string;
  summary: string;
  date: string;
  slug: string;
};

function getPosts(): Post[] {
  const postsPath = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsPath)) {
    return [];
  }

  const files = fs.readdirSync(postsPath).filter((file) => file.endsWith('.md'));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(postsPath, file), 'utf8');
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      let title = slug;
      let summary = '';
      let date = '';

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        frontmatter.split(/\r?\n/).forEach((line) => {
          const [key, ...rest] = line.split(':');
          if (!key) return;
          const value = rest.join(':').trim().replace(/^"|"$/g, '');
          if (key === 'title') title = value;
          if (key === 'summary') summary = value;
          if (key === 'date') date = value;
        });
      }

      return { title, summary, date, slug };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export default function BlogsPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#111111] px-5 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs tracking-widest text-slate-500 font-medium uppercase">Blog</p>
              <h1 className="text-3xl font-bold text-[#111111]">Journal & updates</h1>
            </div>
            <Link
              href="/"
              className="text-sm text-slate-700 border border-slate-200 rounded-lg bg-white px-4 py-2 hover:bg-slate-50 transition"
            >
              Back to home
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            This is where your journal posts live. Add a new markdown post in <code className="rounded bg-slate-100 px-1.5 py-0.5">content/posts</code> or publish from the CMS.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-[#111111] mb-3">No posts yet</p>
            <p className="text-sm text-slate-600 mb-6">Create your first journal post in <code className="rounded bg-slate-100 px-1.5 py-0.5">content/posts</code> or use the CMS.</p>
            <Link
              href="/admin"
              className="inline-flex rounded-full border border-slate-200 bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-900"
            >
              Open CMS
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
                  <span>{post.date || 'No date'}</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">Blog post</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-[#111111]">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.summary || 'No summary available yet.'}</p>
                <div className="mt-6">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-sm font-medium text-black underline-offset-4 hover:underline"
                  >
                    Read post
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
