export const getLastPathSegment = (path) => {
  const segments = path.split("/");

  return segments[segments.length - 1] || segments[segments.length - 2];
};
