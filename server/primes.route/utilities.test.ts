import { describe, expect, test } from "vitest";
import * as fc from "fast-check";
import { getMedian } from "./utilities";

describe("getMedian", () => {
  test("returns median for array", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (numbers) => {
        const sorted = numbers.sort((a, b) => a - b);
        const median = getMedian(sorted);
        if (sorted.length === 0) {
          expect(median).toEqual([]);
        } else if (sorted.length % 2 === 0) {
          expect(median).toEqual([
            sorted[sorted.length / 2 - 1],
            sorted[sorted.length / 2],
          ]);
        } else {
          expect(median).toEqual([sorted[Math.floor(sorted.length / 2)]]);
        }
      })
    );
  });

  // hardcoded tests as a safety net
  test("returns median for odd length array", () => {
    expect(getMedian([1, 2, 3])).toEqual([2]);
  });

  test("returns median for even length array", () => {
    expect(getMedian([1, 2, 3, 4])).toEqual([2, 3]);
  });

  test("returns median for single element array", () => {
    expect(getMedian([1])).toEqual([1]);
  });

  test("returns median for empty array", () => {
    expect(getMedian([])).toEqual([]);
  });
});
