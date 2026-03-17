import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getPostBySlug } from "@/lib/blog";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type BlogPostImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostImage({ params }: BlogPostImageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(140deg, rgb(247,243,234) 0%, rgb(238,224,206) 52%, rgb(40,34,29) 100%)",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "rgb(96,82,63)",
          }}
        >
          Rushil Gangisetty
        </div>
        <div
          style={{
            maxWidth: "940px",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.06em",
            color: "rgb(28,24,20)",
          }}
        >
          {post.title}
        </div>
      </div>
    ),
    size,
  );
}
