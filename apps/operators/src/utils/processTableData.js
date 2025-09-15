export const processTableData = (data, format) => {
  return data.map((item) => {
    return format.map(({ key, transform }) => {
      return transform ? transform(item[key]) : item[key];
    });
  });
};
