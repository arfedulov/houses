/** Return deduped array of houses. */
export default (houses) => {
  const usedTitles = new Set();
  const deduped = [];

  houses.forEach((house) => {
    if (!usedTitles.has(house.title)) {
      deduped.push(house);
      usedTitles.add(house.title);
    }
  });
  return deduped;
};
