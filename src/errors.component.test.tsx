import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Errors } from "./errors.component";
import { ZodIssue } from "zod";

test("should return null when no errors are provided", () => {
  const { container } = render(<Errors errors={undefined} />);
  expect(container.firstChild).toBeNull();
});

test("should correctly render error message and transform error code", () => {
  const error: ZodIssue = {
    code: "invalid_type",
    path: ["limit"],
    expected: "number",
    received: "nan",
    message: "Expected number, received nan",
  };
  render(<Errors errors={[error]} />);
  expect(screen.getByText("Invalid Type")).toBeInTheDocument(); // Transformed error code
  expect(screen.getByText(error.message)).toBeInTheDocument();
});

test("should handle and render multiple error messages", () => {
  // doesn't matter if the errors are duped here
  const errors: ZodIssue[] = [
    {
      code: "invalid_type",
      path: ["limit"],
      expected: "number",
      received: "nan",
      message: "Expected number, received nan",
    },
    {
      code: "too_small",
      path: ["limit"],
      minimum: 1,
      type: "number",
      inclusive: false,
      message: "Value should be greater than or equal to 1",
    },
  ];
  render(<Errors errors={errors} />);
  errors.forEach((error) => {
    expect(
      screen.getByText(
        error.code
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
    ).toBeInTheDocument();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});
