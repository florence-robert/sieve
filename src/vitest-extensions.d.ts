import "vitest";
import type Matchers from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  // Merge the jest matchers with vitest's expect function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<unknown> extends Matchers {}
}
