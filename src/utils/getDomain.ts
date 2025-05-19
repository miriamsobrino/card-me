export const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch (e) {
    console.error('URL no válida:', url);
    return '';
  }
};
