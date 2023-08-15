import { Request, Response } from "express";
import { z } from "zod";
import { segmentedSieve } from "./sieve.ts";
import { getMedian } from "./utilities.ts";

// integer n > 1
// integer n <= 10_000_000
const primeSchema = z.coerce.number().int().gt(1).lte(10_000_000);

// GET /primes?limit=n
const querySchema = z.object({
  limit: primeSchema,
});

export const primes = (req: Request, res: Response) => {
  // Let zod handle the coercion, validation, and errors.
  const parsed = querySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).send(parsed.error.issues);
  }

  const primes = segmentedSieve(parsed.data.limit);
  const median = getMedian(primes);
  return res.status(200).send(median);
};
