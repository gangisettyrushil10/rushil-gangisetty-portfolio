import type { Metadata } from "next";

import { BlogCard } from "@/components/blog-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about product engineering, data systems, and practical machine learning work.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Blog"
        title="Writing that explains the engineering choices."
        description="I use writing to sharpen decision-making. These posts focus on what was built, why the tradeoffs mattered, and what I would improve next."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={0.08 * index}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
