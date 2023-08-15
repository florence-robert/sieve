import React from "react";

interface MedianPrimesProps {
  medians: number[] | undefined;
}

export const MedianPrimes: React.FunctionComponent<MedianPrimesProps> = ({
  medians,
}) => {
  if (!medians || !medians.length) return null;

  return (
    <div className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div data-testid="medians" className="flex flex-col w-full">
        {medians.map((median, i) => (
          <h3 key={`${median}-${i}`} className="font-bold">
            {median}
          </h3>
        ))}
      </div>
    </div>
  );
};
