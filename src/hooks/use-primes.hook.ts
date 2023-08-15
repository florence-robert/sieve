import useSWR from "swr";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  const data = await res.json();
  // this is a bit silly but it's basically saying that if the response isn't ok (ie: 404, 500, etc) then throw the data (which is the zod error from the API)
  if (!res.ok) {
    throw data;
  }
  return data;
}

export const usePrimes = (n: number) => {
  const searchParams = new URLSearchParams({ limit: n.toString() });
  // https://swr.vercel.app/docs/conditional-fetching.en-US#conditional
  const queryKey = n
    ? `${window.location.origin}/api/primes?${searchParams}`
    : null;
  const {
    data,
    error: errors,
    isLoading,
  } = useSWR<number[], ZodError["issues"]>(queryKey, fetcher);
  return {
    primes: data,
    isLoading,
    errors,
  };
};
