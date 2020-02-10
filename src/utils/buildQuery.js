
export const buildQuery = (params) => {
  let q = '?';
  Object.entries(params).forEach((pair) => {
    q += `${pair[0]}=${pair[1]}&`;
  });
  q = q.slice(0, q.length - 1);
  return q;
};

export default buildQuery;
