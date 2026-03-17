import Link from "next/link";

import type { PostEntry } from "@/types/content";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  post: PostEntry;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="surface-card">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
        <span>{formatDate(post.date)}</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-ink))]">{post.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={`${post.slug}-${tag}`} className="pill">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8">
        <Link href={`/blog/${post.slug}`} className="button-secondary">
          Read article
        </Link>
      </div>
    </article>
  );
}
