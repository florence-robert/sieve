import React from "react";
import { useDebounce } from "usehooks-ts";
import "./App.css";
import { usePrimes } from "./hooks/use-primes.hook";
import { Errors } from "./errors.component";
import { MedianPrimes } from "./median-primes.component";

function App() {
  const [value, setValue] = React.useState(0);
  const debouncedValue = useDebounce<number>(value, 300);
  const { primes, isLoading, errors } = usePrimes(debouncedValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <main id="main" className="grow hero">
      <article className="hero-content text-left">
        <section>
          <h1 className="mb-4">Median Prime Numbers</h1>
          <input
            type="number"
            min="1"
            max="10_000_000"
            placeholder="Enter a number"
            className="mb-4 input input-bordered input-primary w-full"
            onChange={handleChange}
          />
          <MedianPrimes medians={primes} />
          <Errors errors={errors} />
          {isLoading && <span className="loading loading-spinner loading-md" />}
        </section>
      </article>
    </main>
  );
}

export default App;
