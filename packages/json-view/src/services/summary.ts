export const getJsonKind = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `array (${value.length})`;
  }

  if (value !== null && typeof value === 'object') {
    return `object (${Object.keys(value).length})`;
  }

  return value === null ? 'null' : typeof value;
};

export const getByteLength = (value: string): number => {
  return new Blob([value]).size;
};

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 1 : 2)} ${units[unitIndex]}`;
};
