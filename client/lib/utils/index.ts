export const normalizeQuery = (q: string | string[] | undefined): string => {
  return Array.isArray(q) ? q[0] : q || '';
};
