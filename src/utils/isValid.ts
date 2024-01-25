export const isValid = (query: any): boolean => {
  if (typeof query !== 'number') {
    return false;
  }

  if (Number.isNaN(query) || !isFinite(query) || query < 0) {
    return false;
  }

  return true;
};
