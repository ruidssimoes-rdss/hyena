/**
 * DatePicker utility functions and constants
 */

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Get the number of days in a given month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of week (0-6) for the first day of a month
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Format a date to a string
 */
export function formatDate(date: Date | null, format: string = 'MMM d, yyyy'): string {
  if (!date) return '';

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return format
    .replace('MMMM', MONTHS[month])
    .replace('MMM', MONTHS_SHORT[month])
    .replace('MM', String(month + 1).padStart(2, '0'))
    .replace('M', String(month + 1))
    .replace('dd', String(day).padStart(2, '0'))
    .replace('d', String(day))
    .replace('yyyy', String(year))
    .replace('yy', String(year).slice(-2));
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Set the month of a date
 */
export function setMonth(date: Date, month: number): Date {
  const result = new Date(date);
  result.setMonth(month);
  return result;
}

/**
 * Set the year of a date
 */
export function setYear(date: Date, year: number): Date {
  const result = new Date(date);
  result.setFullYear(year);
  return result;
}

/**
 * Check if a date is disabled based on constraints
 */
export function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: (date: Date) => boolean
): boolean {
  if (minDate) {
    const minCompare = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const dateCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateCompare < minCompare) return true;
  }
  if (maxDate) {
    const maxCompare = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    const dateCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateCompare > maxCompare) return true;
  }
  if (disabledDates && disabledDates(date)) return true;
  return false;
}

/**
 * Get an array of dates (or nulls for empty cells) for a calendar month view
 */
export function getCalendarDays(year: number, month: number): (Date | null)[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days: (Date | null)[] = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

/**
 * Get a range of years centered around the current year
 */
export function getYearRange(currentYear: number, range: number = 10): number[] {
  const start = currentYear - range;
  const end = currentYear + range;
  const years: number[] = [];
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
}
