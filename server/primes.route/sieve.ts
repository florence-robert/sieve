/** Since we're using 10M as our maximum upper-bound we need to consider that the standard sieve algo won't be sufficient.
 *  Based on the implementation the normal sieve algo stores all values in memory which would be insane at anything beyond 10M.
 *  To get around this we need to use a segmented sieve https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Segmented_sieve
 *  Event the segmented sieve starts to get sluggish at 10M so we'll need to look into a better algorithm if we really need larger numbers.
 **/
export const segmentedSieve = (n: number): number[] => {
  if (n < 2) return []; // Return an empty array if n < 2
  const max = Math.floor(Math.sqrt(n)) + 1;

  const smallPrimes = sieveOfEratosthenes(max);
  const result: number[] = [];
  const segmentSize = 1000; // Fixed segment size

  function processSegment(low: number, high: number, primes: number[]) {
    const segment = Array.from({ length: high - low + 1 }, () => true);

    for (let i = 0; i < primes.length; i++) {
      const prime = primes[i];

      // Fixing the calculation of lowLimit and start
      let lowLimit = Math.floor(low / prime) * prime;
      if (lowLimit < low) lowLimit += prime;
      const start = Math.max(prime * prime, lowLimit);

      for (let j = start; j <= high; j += prime) {
        segment[j - low] = false;
      }
    }

    for (let i = low; i <= high; i++) {
      if (i >= 2 && segment[i - low]) {
        result.push(i);
      }
    }
  }

  for (let low = 0; low <= n; low += segmentSize) {
    const high = Math.min(low + segmentSize - 1, n);
    processSegment(low, high, smallPrimes);
  }

  return result;
};

export function sieveOfEratosthenes(n: number): number[] {
  const numbers = Array.from({ length: n + 1 }, () => true);
  const primeNumbers: number[] = [];
  const max = Math.floor(Math.sqrt(n));

  for (let i = 2; i <= max; i++) {
    if (numbers[i]) {
      primeNumbers.push(i);
      for (let j = i * i; j <= n; j += i) {
        numbers[j] = false;
      }
    }
  }

  for (let i = max + 1; i <= n; i++) {
    if (numbers[i]) {
      primeNumbers.push(i);
    }
  }

  return primeNumbers;
}
