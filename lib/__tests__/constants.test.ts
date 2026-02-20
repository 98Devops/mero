import { services } from "../constants";

describe("Services data", () => {
  it("should have exactly 9 services", () => {
    expect(services).toHaveLength(9);
  });

  it("should include all required service titles", () => {
    const expectedTitles = [
      "AI Automations & Workflows",
      "AI Agents & Chatbots",
      "Internal Business Tools",
      "Web Applications",
      "Website Development",
      "API Integrations",
      "Cloud Infrastructure",
      "DevOps Engineering",
      "AI Consulting",
    ];

    const actualTitles = services.map((service) => service.title);

    expectedTitles.forEach((title) => {
      expect(actualTitles).toContain(title);
    });
  });

  it("should have all required properties for each service", () => {
    services.forEach((service) => {
      expect(service).toHaveProperty("id");
      expect(service).toHaveProperty("icon");
      expect(service).toHaveProperty("title");
      expect(service).toHaveProperty("description");
      expect(service).toHaveProperty("category");
      
      expect(typeof service.id).toBe("string");
      expect(typeof service.icon).toBe("string");
      expect(typeof service.title).toBe("string");
      expect(typeof service.description).toBe("string");
      expect(typeof service.category).toBe("string");
    });
  });

  it("should have valid category values", () => {
    const validCategories = ["ai-automation", "development", "infrastructure", "consulting"];
    
    services.forEach((service) => {
      expect(validCategories).toContain(service.category);
    });
  });
});
