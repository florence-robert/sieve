import { beforeEach, test, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import fc from "fast-check";

const mockError = {
  code: "invalid_type",
  expected: "number",
  received: "nan",
  message: "Expected number, received nan",
};

beforeEach(() => {
  vi.resetModules();
});

test("should handle input changes", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Enter a number");
  fc.assert(
    fc.property(fc.integer({ min: 1, max: 10000000 }), (value) => {
      fireEvent.change(input, { target: { value: value.toString() } });
      expect(input).toHaveValue(value);
    })
  );
});

test("should display loading spinner when loading", () => {
  const { container } = render(<App />);
  const [loading] = container.getElementsByClassName(
    "loading loading-spinner loading-md"
  );
  expect(loading);
});

test("should display median primes for a given input", async () => {
  vi.mock("./hooks/use-primes.hook.ts", () => ({
    usePrimes: vi
      .fn()
      .mockReturnValue({ primes: [3, 5], isLoading: false, errors: null }),
  }));
  render(<App />);
  const input = screen.getByPlaceholderText("Enter a number");
  const value = 9;
  const expectedMedians = ["3", "5"];
  fireEvent.change(input, { target: { value: value.toString() } });
  const medians = screen.getByTestId("medians");
  const data = Array.from(medians.children).map((median) => {
    return median.textContent;
  });
  expect(data).toEqual(expectedMedians);
});

test("should display errors if any", async () => {
  const usePrimesHook = await import("./hooks/use-primes.hook.ts");
  // @ts-expect-error readonly property in the real world
  usePrimesHook.usePrimes = vi
    .fn()
    .mockReturnValue({ primes: [], isLoading: false, errors: [mockError] });
  render(<App />);
  expect(screen.getByText(mockError.message)).toBeInTheDocument();
});
