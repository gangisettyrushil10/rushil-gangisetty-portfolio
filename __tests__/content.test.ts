import { getFeaturedProjects, getProjectBySlug, projects } from "@/lib/content";

describe("project content", () => {
  it("keeps five curated flagship projects", () => {
    expect(projects).toHaveLength(5);
    expect(getFeaturedProjects()).toHaveLength(5);
  });

  it("includes Buzzr as a flagship product project", () => {
    const buzzr = getProjectBySlug("buzzr");

    expect(buzzr?.category).toBe("Product");
    expect(buzzr?.metrics.some((metric) => metric.value === "38")).toBe(true);
    expect(buzzr?.gallery).toHaveLength(3);
    expect(buzzr?.decisions).toHaveLength(3);
  });
});
