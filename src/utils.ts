export function toPascalCase(snakeCaseString: string): string {
  return snakeCaseString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
