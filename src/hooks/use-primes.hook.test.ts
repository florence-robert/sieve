import { afterEach, afterAll, beforeAll, expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { usePrimes } from "./use-primes.hook";

const server = setupServer(
  rest.get("/api/primes", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");
    if (limit === "10") {
      return res(ctx.json([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]));
    }
    return res(
      ctx.status(400),
      ctx.json([
        {
          code: "too_small",
          path: ["limit"],
          minimum: 1,
          type: "number",
          inclusive: false,
          message: "Value should be greater than or equal to 1",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should return correct primes for a given number", async () => {
  const { result } = renderHook(() => usePrimes(10));
  await waitFor(() => {
    expect(result.current.primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errors).toBeUndefined();
  });
});

test("should handle errors correctly", async () => {
  const { result } = renderHook(() => usePrimes(-1));
  await waitFor(() => {
    expect(result.current.errors).toEqual([
      {
        code: "too_small",
        path: ["limit"],
        minimum: 1,
        type: "number",
        inclusive: false,
        message: "Value should be greater than or equal to 1",
      },
    ]);
    expect(result.current.primes).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });
});

test("should indicate loading state", async () => {
  const { result } = renderHook(() => usePrimes(10));
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
});
