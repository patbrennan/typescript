function sumArray(array: number[]): number {
  if (array === null || array.length <= 1) return 0;
  return array.reduce( (acc, curr) => acc + curr) - Math.max(...array) - Math.min(...array);
}

