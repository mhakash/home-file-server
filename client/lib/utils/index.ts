export const normalizeQuery = (q: string | string[] | undefined): string => {
  return Array.isArray(q) ? q[0] : q || '';
};

export const getHostFromStore = (): string | undefined => {
  return localStorage.getItem('host')?.replace(/(^"|"$)/g, '');
};

export const pathJoin = (...args: string[]) => {
  var parts: string[] = [];
  for (var i = 0, l = args.length; i < l; i++) {
    parts = parts.concat(args[i].split('/'));
  }
  var newParts = [];
  for (i = 0, l = parts.length; i < l; i++) {
    var part = parts[i];
    if (!part || part === '.') continue;
    if (
      newParts.length !== 0 &&
      newParts[newParts.length - 1] !== '..' &&
      part === '..'
    )
      newParts.pop();
    else newParts.push(part);
  }
  if (parts[0] === '') newParts.unshift('');
  return newParts.join('/') || (newParts.length ? '/' : '.');
};
