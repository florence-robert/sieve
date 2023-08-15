export const getMedian = (numbers: number[]) => {
  if (!numbers.length) return [];
  const medianIndex = numbers.length / 2;
  if (Number.isInteger(medianIndex)) {
    return [numbers[medianIndex - 1], numbers[medianIndex]];
  } else {
    const median = numbers[Math.floor(medianIndex)];
    return [median];
  }
};
