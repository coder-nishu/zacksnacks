export function buildSummary(orders) {
  const lineByKey = new Map();

  for (const order of orders) {
    for (const item of order.items) {
      const key = item.name.toLowerCase();
      if (!lineByKey.has(key)) {
        lineByKey.set(key, { name: item.name, qty: 0, price: item.price ?? null, orderedBy: new Set() });
      }
      const line = lineByKey.get(key);
      line.qty += item.qty;
      if (line.price == null && item.price != null) line.price = item.price;
      line.orderedBy.add(order.name);
    }
  }

  const lines = Array.from(lineByKey.values())
    .map((line) => ({
      name: line.name,
      qty: line.qty,
      price: line.price,
      cost: line.price != null ? line.price * line.qty : null,
      orderedBy: Array.from(line.orderedBy),
    }))
    .sort((a, b) => b.qty - a.qty || a.name.localeCompare(b.name));

  const totalItems = lines.reduce((sum, line) => sum + line.qty, 0);
  const totalCost = lines.reduce((sum, line) => sum + (line.cost ?? 0), 0);
  const hasUnpriced = lines.some((line) => line.price == null);

  return { lines, totalItems, totalCost, hasUnpriced };
}

export function orderTotal(items) {
  return items
    .filter((item) => item.price != null)
    .reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function orderItemCount(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
