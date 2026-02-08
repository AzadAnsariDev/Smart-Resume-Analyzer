export function mapLevelToScore(level) {
  const map = {
    very_weak: 45,
    weak: 52,
    below_average: 60,
    average: 68,
    good: 78,
    strong: 88,
  };

  return map[level] ?? 60;
}
