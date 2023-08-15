import { describe, expect, test, beforeAll, afterAll } from "vitest";
import * as fc from "fast-check";
import express, { Express } from "express";
import request from "supertest";
import { primes } from ".";
import { Server } from "http";

let server: Server;
let port: number;
let app: Express;

beforeAll(() => {
  app = express();
  app.get("/primes", primes);
  server = app.listen(0, () => {
    // @ts-expect-error port exists but the types are weird
    port = server.address()?.port;
  });
});

afterAll(() => {
  server.close();
});

describe("GET /primes?limit=n", () => {
  test("GET /primes?limit=n returns 400 for non-integer limits", () => {
    fc.assert(
      fc.asyncProperty(fc.oneof(fc.string(), fc.float()), async (limit) => {
        const response = await request(app).get(`/primes?limit=${limit}`);
        expect(response.status).toBe(400);
      })
    );
  });
  test("GET /primes?limit=n returns correct median for edge limits", () => {
    // Testing both the lower and upper limits
    [2, 10_000_000].forEach(async (limit) => {
      const response = await request(app).get(`/primes?limit=${limit}`);
      expect(response.status).toBe(200);
      // Check if the array length is between 0 and 2
      expect(response.body.length).toBeGreaterThanOrEqual(0);
      expect(response.body.length).toBeLessThanOrEqual(2);

      // Check if every element in the array is a number
      response.body.forEach((item) => {
        expect(typeof item).toBe("number");
      });
    });
  });

  test("primes route returns a 400 error for invalid inputs", () => {
    fc.assert(
      fc.asyncProperty(
        fc
          .integer({ min: -10_000_000, max: 1 })
          .chain((n) =>
            fc.string({ maxLength: 10 }).map((str) => `${n}${str}`)
          ),
        async (limit) => {
          const response = await fetch(
            `http://localhost:${port}/primes?limit=${limit}`
          );
          expect(response.status).toBe(400);
        }
      )
    );
  });

  test("GET /primes without limit returns 400", async () => {
    const response = await request(app).get("/primes");
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid_type",
          expected: "number",
          received: "nan",
          message: "Expected number, received nan",
        }),
      ])
    );
  });
});
