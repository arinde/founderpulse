export function aggregateWeekly(data: { date: string; value: number }[]) {
  const weeks: Record<string, number> = {};

  data.forEach((item) => {
    const dateObj = new Date(item.date);
    const year = dateObj.getFullYear();
    const weekNumber = Math.ceil(
      ((dateObj.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7
    );
    const key = `Week ${weekNumber}`;

    weeks[key] = (weeks[key] || 0) + item.value;
  });

  return Object.keys(weeks).map((week) => ({
    date: week,
    value: weeks[week],
  }));
}
