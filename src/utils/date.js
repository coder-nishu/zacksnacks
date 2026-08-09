// Returns "YYYY-MM-DD" for the current day in Asia/Dhaka.
// Never derive "today" from `new Date().toISOString()` — UTC rolls the date
// over around 6 AM Dhaka time, which would flip orders to the wrong day.
export function todayDhaka() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
}

// Turns "2026-08-09" into "রবিবার — ০৯ আগস্ট".
export function prettyDateBn(isoDate = todayDhaka()) {
  const d = new Date(`${isoDate}T00:00:00+06:00`); // Dhaka offset
  const parts = new Intl.DateTimeFormat('bn-BD', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    timeZone: 'Asia/Dhaka',
  }).formatToParts(d);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('weekday')} — ${get('day')} ${get('month')}`;
}
