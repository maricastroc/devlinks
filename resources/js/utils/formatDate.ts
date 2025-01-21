export const formatDate = (date: string | Date | null) => {
  return date instanceof Date
    ? date.toISOString()
    : typeof date === 'string'
      ? new Date(date).toISOString()
      : null;
};
