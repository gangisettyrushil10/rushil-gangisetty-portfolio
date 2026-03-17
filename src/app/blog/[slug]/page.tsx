import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { StructuredData } from "@/components/structured-data";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/lib/mdx-components";
import { siteName, siteUrl } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-[92%] max-w-4xl pb-24 pt-16 md:pt-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: siteName,
          },
          datePublished: post.date,
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        }}
      />

      <p className="eyebrow">Blog post</p>
      <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.08em] text-[rgb(var(--ink))] md:text-6xl">
        {post.title}
      </h1>
      <div className="mt-6 flex flex-wrap gap-4 text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
        <span>{formatDate(post.date)}</span>
        <span>{post.readingTime}</span>
      </div>
      <p className="mt-6 max-w-3xl text-xl leading-9 text-[rgb(var(--muted-ink))]">
        {post.excerpt}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={`${post.slug}-${tag}`} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <div className="article-prose mt-14">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
