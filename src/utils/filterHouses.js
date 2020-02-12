import isNumber from '@/utils/isNumber';
import isUrl from '@/utils/isUrl';

/** Return filtered arary of houses. */
export default (houses, filters) => {
  const {
    showAll = false,
    priceFrom = 0,
    priceTo = Number.POSITIVE_INFINITY,
    bedroomsFrom = 0,
    bedroomsTo = Number.POSITIVE_INFINITY,
    hasImage = false,
  } = filters;

  if (showAll) {
    return houses;
  }

  const check = (item) => {
    const priceGte = !isNumber(item.price) || item.price >= +priceFrom;
    const priceLte = !isNumber(item.price) || item.price <= +priceTo;
    const bedroomsGte = !isNumber(item.bedrooms) || item.bedrooms >= +bedroomsFrom;
    const bedroomsLte = !isNumber(item.bedrooms) || item.bedrooms <= +bedroomsTo;
    const image = !hasImage || isUrl(item.imageUrl);

    return priceGte && priceLte && bedroomsGte && bedroomsLte && image;
  };

  return houses.filter(check);
};
