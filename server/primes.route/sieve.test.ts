import { describe, test, expect } from "vitest";
import * as fc from "fast-check";
import { sieveOfEratosthenes, segmentedSieve } from "./sieve";

// Hardcoded tests as a safety net
describe("sieveOfEratosthenes", () => {
  test("returns correct primes for n=10", () => {
    expect(sieveOfEratosthenes(10)).toEqual([2, 3, 5, 7]);
  });

  test("returns empty array for n < 2", () => {
    expect(sieveOfEratosthenes(0)).toEqual([]);
    expect(sieveOfEratosthenes(1)).toEqual([]);
  });

  test("returns correct primes for n=30", () => {
    expect(sieveOfEratosthenes(30)).toEqual([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    ]);
  });
});

describe("segmentedSieve", () => {
  test("returns correct primes for n=10", () => {
    expect(segmentedSieve(10)).toEqual([2, 3, 5, 7]);
  });

  test("returns empty array for n < 2", () => {
    expect(segmentedSieve(0)).toEqual([]);
    expect(segmentedSieve(1)).toEqual([]);
  });

  test("returns correct primes for n=30", () => {
    expect(segmentedSieve(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });
});

const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

test("segmentedSieve returns correct primes", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 1000 }), (n) => {
      const primes = segmentedSieve(n);
      // Check that all numbers in the result are primes
      expect(primes.every(isPrime)).toBe(true);
      // Check that there are no missing primes
      expect(primes.length).toBe(
        Array.from({ length: n + 1 }, (_, i) => i).filter(isPrime).length
      );
    })
  );
});
