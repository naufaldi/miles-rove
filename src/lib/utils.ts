import { clsx, type ClassValue } from 'clsx';
import { formatDuration, intervalToDuration } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatAirlines = (airlines: string) => {
  if (!airlines) return 'Not available';
  return airlines
    .split(',')
    .map((airline) => airline.trim())
    .join(', ');
};

export function formatDistance(minutes: number): string {
  if (!minutes) return 'N/A';

  const duration = intervalToDuration({
    start: 0,
    end: minutes * 60 * 1000,
  });

  return formatDuration(duration, {
    format: ['hours', 'minutes'],
    zero: false,
    delimiter: ' ',
  });
}
