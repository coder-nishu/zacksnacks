import data from '../config/data.json';
import { getSnacks, getEmployees } from './adminStore';

const DEFAULTS = {
  office: 'Office',
  assistant: 'Admin',
  currency: '৳',
};

export function getConfig() {
  return {
    office: data.office || DEFAULTS.office,
    assistant: data.assistant || DEFAULTS.assistant,
    currency: data.currency || DEFAULTS.currency,
    employees: getEmployees(),
    snacks: getSnacks(),
  };
}
