import { isValidElement } from "react";

import BlogIndexPage, { metadata as blogMetadata } from "@/app/blog/page";
import ContactPage, { metadata as contactMetadata } from "@/app/contact/page";
import HomePage from "@/app/page";
import ProjectsPage, { metadata as projectsMetadata } from "@/app/projects/page";
import ResumePage, { metadata as resumeMetadata } from "@/app/resume/page";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getFeaturedProjects, projects } from "@/lib/content";
import { profile } from "@/lib/site-config";

describe("route module smoke tests", () => {
  it("creates the primary page element trees", () => {
    expect(isValidElement(HomePage())).toBe(true);
    expect(isValidElement(ProjectsPage())).toBe(true);
    expect(isValidElement(BlogIndexPage())).toBe(true);
    expect(isValidElement(ResumePage())).toBe(true);
    expect(isValidElement(ContactPage())).toBe(true);
  });

  it("exposes the expected static route metadata", () => {
    expect(projectsMetadata.title).toBe("Projects");
    expect(blogMetadata.title).toBe("Blog");
    expect(resumeMetadata.title).toBe("Resume");
    expect(contactMetadata.title).toBe("Contact");
  });

  it("keeps curated content counts stable", () => {
    expect(projects).toHaveLength(5);
    expect(getFeaturedProjects()).toHaveLength(5);
    expect(getAllPosts()).toHaveLength(3);
    expect(profile.resumePath).toBe("/resume/rushil-gangisetty-resume.pdf");
  });

  it("resolves the published blog entries and slugs", () => {
    expect(getAllPosts().map((post) => post.slug)).toEqual(
      expect.arrayContaining([
        "building-buzzr",
        "business-dashboard-lessons",
        "internship-engineering-systems",
      ]),
    );
  });

  it("loads full content for a published blog post", () => {
    const post = getPostBySlug("building-buzzr");

    expect(post?.title).toBe("Building Buzzr beyond the mockup");
    expect(post?.excerpt).toMatch(/live leagues/i);
    expect(post?.content).toMatch(/migrations/i);
  });
});
