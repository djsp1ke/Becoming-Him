import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import { getAllPosts, getPostBySlug } from "@/lib/blogs";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Becoming Him` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <div className="space-y-2">
        <Link
          href="/blogs"
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          &larr; Back to Blog
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500">{post.date}</p>
      </div>
      <div className="prose prose-invert prose-zinc max-w-none">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
