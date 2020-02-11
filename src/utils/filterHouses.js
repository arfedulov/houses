
/** Return filtered arary of houses. */
export default (houses, filters) => {
  let filtered = [...houses];
  const {
    showAll,
    priceFrom,
    priceTo,
    bedroomsFrom,
    bedroomsTo,
    hasImage,
  } = filters;
  if (showAll) {
    return filtered;
  }
  if (Number.isFinite(priceFrom)) {
    filtered = filtered.filter(item => item.price >= priceFrom);
  }
  if (Number.isFinite(priceTo)) {
    filtered = filtered.filter(item => item.price <= priceTo);
  }
  if (Number.isFinite(bedroomsFrom)) {
    filtered = filtered.filter(item => item.bedrooms >= bedroomsFrom);
  }
  if (Number.isFinite(bedroomsTo)) {
    filtered = filtered.filter(item => item.bedrooms <= bedroomsTo);
  }
  if (hasImage) {
    filtered = filtered.filter(item => item.imageUrl);
  }
  return filtered;
};
