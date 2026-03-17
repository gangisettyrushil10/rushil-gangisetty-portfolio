import { getFeaturedProjects, getProjectBySlug, projects } from "@/lib/content";

describe("project content", () => {
  it("keeps four featured flagship projects and one supporting project", () => {
    expect(projects).toHaveLength(5);
    expect(getFeaturedProjects()).toHaveLength(4);
  });

  it("includes Buzzr Ecosystem as a flagship product project", () => {
    const buzzr = getProjectBySlug("buzzr-ecosystem");

    expect(buzzr?.category).toBe("Product");
    expect(buzzr?.metrics.some((metric) => metric.value === "38")).toBe(true);
    expect(buzzr?.gallery).toHaveLength(3);
    expect(buzzr?.decisions).toHaveLength(4);
  });
});
