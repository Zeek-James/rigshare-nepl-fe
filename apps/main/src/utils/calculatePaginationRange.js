export const calculatePaginationRange = (pagination) => {
  const currentPage = pagination?.page || 0;
  const pageSize = pagination?.page_size || 0;
  const totalItems = pagination?.count || 0;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return { startItem, endItem };
};
