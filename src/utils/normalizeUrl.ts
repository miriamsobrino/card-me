export const normalizeUrl = (url: string) => {
  if (
    url.trim() !== '' &&
    (url.startsWith('http') || url.startsWith('https'))
  ) {
    return url;
  }

  return `https://${url}`;
};
