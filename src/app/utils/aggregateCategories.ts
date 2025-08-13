export function aggregateCategories(data: { date: string; category: string; value: number }[]) {
  const categories: Record<string, number> = {};

  data.forEach((item) => {
    categories[item.category] = (categories[item.category] || 0) + item.value;
  });

  return Object.keys(categories).map((cat) => ({
    name: cat,
    value: categories[cat],
  }));
}
