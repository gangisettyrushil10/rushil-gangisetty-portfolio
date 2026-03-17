import { getAllPosts, getPostBySlug } from "@/lib/blog";

describe("blog content", () => {
  it("loads seeded posts in descending date order", () => {
    const posts = getAllPosts();

    expect(posts).toHaveLength(3);
    expect(posts[0]?.date >= posts[1]?.date).toBe(true);
    expect(posts[1]?.date >= posts[2]?.date).toBe(true);
  });

  it("resolves a post by slug", () => {
    const post = getPostBySlug("building-buzzr");

    expect(post?.title).toBe("Building Buzzr beyond the mockup");
    expect(post?.content).toContain("Buzzr");
  });
});
