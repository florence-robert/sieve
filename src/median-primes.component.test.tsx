import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MedianPrimes } from "./median-primes.component";

test("should return null when no medians are provided", () => {
  const { container } = render(<MedianPrimes medians={undefined} />);
  expect(container.firstChild).toBeNull();
});

test("should return null when an empty array of medians is provided", () => {
  const { container } = render(<MedianPrimes medians={[]} />);
  expect(container.firstChild).toBeNull();
});

test("should correctly render a single median prime", () => {
  const medians = [5];
  render(<MedianPrimes medians={medians} />);
  expect(screen.getByText(medians[0].toString())).toBeInTheDocument();
});

test("should correctly render multiple median primes", () => {
  const medians = [3, 5, 7];
  render(<MedianPrimes medians={medians} />);
  medians.forEach((median) => {
    expect(screen.getByText(median.toString())).toBeInTheDocument();
  });
});

test("should render medians in a div with correct classes", () => {
  const medians = [3, 5, 7];
  render(<MedianPrimes medians={medians} />);
  const mediansDiv = screen.getByTestId("medians");
  expect(mediansDiv).toHaveClass("flex", "flex-col", "w-full");
});
