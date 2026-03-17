import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import type { PostEntry, PostFrontmatter, PostWithContent } from "@/types/content";

const blogDir = path.join(process.cwd(), "src", "content", "blog");

function parseFrontmatter(fileName: string, raw: string): PostWithContent {
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<PostFrontmatter>;
  const slug = frontmatter.slug || fileName.replace(/\.mdx$/, "");

  if (!frontmatter.title || !frontmatter.date || !frontmatter.excerpt) {
    throw new Error(`Missing required frontmatter in ${fileName}`);
  }

  return {
    title: frontmatter.title,
    slug,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags || [],
    published: frontmatter.published ?? true,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPosts(): PostEntry[] {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
      const post = parseFrontmatter(file, raw);
      return {
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        published: post.published,
        readingTime: post.readingTime,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const post = parseFrontmatter(`${slug}.mdx`, raw);
  return post.published ? post : null;
}
