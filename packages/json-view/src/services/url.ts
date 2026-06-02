export const getJsonStringUrl = (token: string): string | undefined => {
  try {
    const value = JSON.parse(token) as unknown;

    if (typeof value !== 'string') {
      return undefined;
    }

    return isHttpUrl(value) ? value : undefined;
  } catch {
    return undefined;
  }
};

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};
