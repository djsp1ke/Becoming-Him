import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type PostData = {
  title: string;
  date: string;
  summary: string;
  contentHtml: string;
};

function parseMarkdown(markdown: string) {
  // Split into blocks but preserve single line breaks for formatting
  const blocks = markdown.trim().split(/\r?\n\r?\n/);

  return blocks
    .map((block) => {
      // Handle horizontal rules
      if (/^---+$/.test(block.trim())) {
        return '<hr>';
      }

      // Handle blockquotes
      if (block.trim().startsWith('>')) {
        const quoteContent = block
          .split('\n')
          .map(line => line.replace(/^>\s?/, ''))
          .join('\n')
          .trim();
        return `<blockquote>${parseInlineMarkdown(quoteContent)}</blockquote>`;
      }

      // Handle headings
      const headingMatch = block.match(/^(#{1,6})\s+(.*)$/m);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const content = parseInlineMarkdown(headingMatch[2].trim());
        return `<h${level}>${content}</h${level}>`;
      }

      // Handle lists
      if (/^\s*-\s+/m.test(block)) {
        const items = block
          .split(/\r?\n/)
          .filter((line) => /^\s*-\s+/.test(line))
          .map((line) => {
            const content = parseInlineMarkdown(line.replace(/^\s*-\s+/, '').trim());
            return `<li>${content}</li>`;
          })
          .join('');
        return `<ul>${items}</ul>`;
      }

      // Handle regular paragraphs
      const paragraph = block.trim();
      if (paragraph) {
        return `<p>${parseInlineMarkdown(paragraph)}</p>`;
      }

      return '';
    })
    .join('');
}

function parseInlineMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Escape HTML
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getPostData(slug: string): PostData | null {
  const postsPath = path.join(process.cwd(), 'content/posts');
  const postFile = path.join(postsPath, `${slug}.md`);
  if (!fs.existsSync(postFile)) {
    return null;
  }

  const raw = fs.readFileSync(postFile, 'utf8');
  const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const content = frontmatterMatch ? raw.slice(frontmatterMatch[0].length) : raw;
  const metadata = {
    title: slug,
    date: '',
    summary: '',
  };

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    frontmatter.split(/\r?\n/).forEach((line) => {
      const [key, ...rest] = line.split(':');
      if (!key) return;
      const value = rest.join(':').trim().replace(/^"|"$/g, '');
      if (key === 'title') metadata.title = value;
      if (key === 'date') metadata.date = value;
      if (key === 'summary') metadata.summary = value;
    });
  }

  return {
    title: metadata.title,
    date: metadata.date,
    summary: metadata.summary,
    contentHtml: parseMarkdown(content),
  };
}

export function generateStaticParams() {
  const postsPath = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsPath)) {
    return [];
  }

  return fs
    .readdirSync(postsPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({ slug: file.replace(/\.md$/, '') }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#111111] px-5 py-12">
      <div className="max-w-3xl mx-auto">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 text-sm text-slate-500">{post.date || 'Draft post'}</div>
          <h1 className="text-4xl font-bold text-[#111111]">{post.title}</h1>
          {post.summary ? <p className="mt-4 text-lg text-slate-600">{post.summary}</p> : null}
          <div
            className="prose prose-slate mt-8 max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <div className="mt-8 flex justify-between gap-4">
          <Link
            href="/blogs"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to journal
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-900"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
