import data from '../config/data.json';
import { getCustomSnacks, getCustomEmployees } from './adminStore';

const DEFAULTS = {
  office: 'Office',
  assistant: 'Admin',
  currency: '৳',
  employees: [],
  snacks: [],
};

function normalizeSnacks(snacks) {
  if (!Array.isArray(snacks)) return [];
  return snacks
    .filter((s) => s && typeof s.name === 'string' && s.name.trim().length > 0)
    .map((s) => {
      const price = Number(s.price);
      return { name: s.name, price: Number.isFinite(price) ? price : null };
    });
}

export function getConfig() {
  const seedSnacks = normalizeSnacks(data.snacks);
  const customSnacks = normalizeSnacks(getCustomSnacks());
  const seedNames = new Set(seedSnacks.map((s) => s.name));
  const snacks = [...seedSnacks, ...customSnacks.filter((s) => !seedNames.has(s.name))];

  const seedEmployees = Array.isArray(data.employees) ? data.employees : DEFAULTS.employees;
  const employees = [...seedEmployees, ...getCustomEmployees()];

  return {
    office: data.office || DEFAULTS.office,
    assistant: data.assistant || DEFAULTS.assistant,
    currency: data.currency || DEFAULTS.currency,
    employees,
    snacks,
  };
}
