import express from "express";
import { primes } from "./primes.route/index.ts";

const app = express();

app.use(express.json());

app.get("/primes", primes);

const start = (): void => {
  try {
    app.listen(3001, () => {
      // eslint-disable-next-line no-console
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

start();
