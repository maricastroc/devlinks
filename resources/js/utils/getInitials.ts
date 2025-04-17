export const getInitials = (username?: string | null) => {
  if (!username) return '?';
  const names = username.split(' ');
  return names
    .map((username) => username[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
