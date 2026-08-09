import { todayDhaka } from './date';

function csvCell(value) {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function csvRow(cells) {
  return cells.map(csvCell).join(',');
}

export function downloadOrdersCsv(orders, summary, config) {
  const today = todayDhaka();
  const rows = [];

  rows.push(csvRow([`${config.office} Snacks — ${today}`]));
  rows.push('');

  rows.push(csvRow(['Employee', 'Item', 'Qty', 'Unit Price', 'Line Total']));
  for (const order of orders) {
    for (const item of order.items) {
      const lineTotal = item.price != null ? item.price * item.qty : '';
      rows.push(csvRow([order.name, item.name, item.qty, item.price ?? '', lineTotal]));
    }
  }
  rows.push('');

  rows.push(csvRow(['Item', 'Total Qty', 'Unit Price', 'Line Total', 'Ordered By']));
  for (const line of summary.lines) {
    rows.push(csvRow([line.name, line.qty, line.price ?? '', line.cost ?? '', line.orderedBy.join('; ')]));
  }
  rows.push('');
  rows.push(csvRow(['Grand total', summary.totalItems, '', summary.totalCost]));

  const csv = rows.join('\n');
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `twinforce_snacks_${today}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
