/**
 * Dependency Constraints Tests
 * Tests that package.json doesn't include heavy libraries
 * Validates Requirement 6.6
 */

import packageJson from "../package.json";

describe("Dependency Constraints - Task 16.4", () => {
  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const heavyLibraries = [
    "three",
    "three.js",
    "@react-three/fiber",
    "@react-three/drei",
    "gsap",
    "lottie-react",
    "lottie-web",
    "pixi.js",
    "phaser",
    "babylon.js",
    "@babylonjs/core",
    "matter-js",
    "cannon",
    "ammo.js",
  ];

  test("package.json does not include Three.js", () => {
    const threeJsVariants = ["three", "three.js", "@react-three/fiber", "@react-three/drei"];
    
    threeJsVariants.forEach((lib) => {
      expect(allDependencies).not.toHaveProperty(lib);
    });
  });

  test("package.json does not include heavy animation libraries", () => {
    const heavyAnimationLibs = ["gsap", "lottie-react", "lottie-web"];
    
    heavyAnimationLibs.forEach((lib) => {
      expect(allDependencies).not.toHaveProperty(lib);
    });
  });

  test("package.json does not include GPU particle engines", () => {
    const particleEngines = ["pixi.js", "phaser"];
    
    particleEngines.forEach((lib) => {
      expect(allDependencies).not.toHaveProperty(lib);
    });
  });

  test("package.json does not include 3D physics engines", () => {
    const physicsEngines = ["babylon.js", "@babylonjs/core", "matter-js", "cannon", "ammo.js"];
    
    physicsEngines.forEach((lib) => {
      expect(allDependencies).not.toHaveProperty(lib);
    });
  });

  test("package.json only includes lightweight dependencies", () => {
    // Check that no heavy libraries are present
    const dependencyNames = Object.keys(allDependencies);
    
    heavyLibraries.forEach((heavyLib) => {
      const isPresent = dependencyNames.some((dep) => 
        dep.toLowerCase().includes(heavyLib.toLowerCase())
      );
      
      expect(isPresent).toBe(false);
    });
  });

  test("Framer Motion is used for animations (lightweight alternative)", () => {
    // Verify we're using Framer Motion as the lightweight animation library
    expect(allDependencies).toHaveProperty("framer-motion");
  });

  test("Next.js Image optimization is available", () => {
    // Verify Next.js is present for image optimization
    expect(allDependencies).toHaveProperty("next");
  });

  test("Total number of dependencies is reasonable", () => {
    const totalDeps = Object.keys(allDependencies).length;
    
    // Should have a reasonable number of dependencies (not bloated)
    // Current count is around 25-30, so we set a threshold of 50
    expect(totalDeps).toBeLessThan(50);
  });

  test("No test harness libraries in production dependencies", () => {
    const productionDeps = packageJson.dependencies || {};
    const testLibraries = ["jest", "vitest", "mocha", "jasmine", "karma"];
    
    testLibraries.forEach((testLib) => {
      expect(productionDeps).not.toHaveProperty(testLib);
    });
  });

  test("Bundle analyzer is only in dev dependencies", () => {
    // Bundle analyzer should be in devDependencies, not dependencies
    expect(packageJson.dependencies).not.toHaveProperty("@next/bundle-analyzer");
    expect(packageJson.devDependencies).toHaveProperty("@next/bundle-analyzer");
  });
});
