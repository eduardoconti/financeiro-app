export const calculateMedian = (arr: number[]): number => {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return Math.round((s.length % 2 === 0 ? ((s[mid - 1] + s[mid]) / 2) : s[mid]) * 100) / 100;
};