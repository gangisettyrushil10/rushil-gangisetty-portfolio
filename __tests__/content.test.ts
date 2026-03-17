import { getFeaturedProjects, getProjectBySlug, projects } from "@/lib/content";

describe("project content", () => {
  it("keeps four featured flagship projects and two supporting projects", () => {
    expect(projects).toHaveLength(6);
    expect(getFeaturedProjects()).toHaveLength(4);
  });

  it("includes Buzzr Ecosystem as a flagship product project", () => {
    const buzzr = getProjectBySlug("buzzr-ecosystem");

    expect(buzzr?.category).toBe("Product");
    expect(buzzr?.metrics.some((metric) => metric.value === "38")).toBe(true);
    expect(buzzr?.gallery).toHaveLength(3);
    expect(buzzr?.decisions).toHaveLength(4);
  });

  it("includes Ledger OKCU as the .NET systems proof", () => {
    const ledger = getProjectBySlug("ledger-okcu");

    expect(ledger?.category).toBe("Systems");
    expect(ledger?.stack).toEqual(expect.arrayContaining(["C#", "ASP.NET Core", "Entity Framework Core"]));
    expect(ledger?.metrics.some((metric) => metric.value === "10")).toBe(true);
  });
});
