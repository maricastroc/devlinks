import { formatInTimeZone } from 'date-fns-tz';

export const formatDate = (date: string | Date | null) => {
  if (!date) {
    return null;
  }

  const timeZone = 'America/Sao_Paulo';
  const parsedDate = date instanceof Date ? date : new Date(date);

  return formatInTimeZone(parsedDate, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};