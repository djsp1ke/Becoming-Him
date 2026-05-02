import Link from "next/link";
import { getAllPosts } from "@/lib/blogs";

export const metadata = {
  title: "Blog | Becoming Him",
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-white">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-zinc-500">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="block p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors"
            >
              <div className="space-y-2">
                <p className="text-sm text-zinc-500">{post.date}</p>
                <h2 className="text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="text-zinc-400 text-sm">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
