import filterHouses from '@/utils/filterHouses';

describe('utils:filterHouses', () => {
  it('return unfiltered list if ALL filter applied', () => {
    const ALL = true;
    const FILTERS = { showAll: ALL };

    const HOUSES = [
      { title: 'a' },
      { title: 'b' },
      { title: 'c' },
      { title: 'd' },
      { title: 'e' },
      { title: 'f' },
      { title: 'g' },
    ];

    const EXPECT = [...HOUSES];

    const actual = filterHouses(HOUSES, FILTERS);

    expect(actual).toEqual(EXPECT);
  });

  it('return only houses with price greater than PRICE_FROM', () => {
    const PRICE_FROM = 15;
    const FILTERS = { priceFrom: PRICE_FROM };

    const HOUSES = [
      { price: 10 },
      { price: 10 },

      { price: 20 },
      { price: 30 },
      { price: 40 },

      { price: 10 },
      { price: 10 },
    ];

    const EXPECT = [
      { price: 20 },
      { price: 30 },
      { price: 40 },
    ];

    const actual = filterHouses(HOUSES, FILTERS);

    expect(actual).toEqual(EXPECT);
  });

  it('return only houses with price less than PRICE_TO', () => {
    const PRICE_TO = 15;
    const FILTERS = { priceTo: PRICE_TO };

    const HOUSES = [
      { price: 10 },
      { price: 10 },

      { price: 20 },
      { price: 30 },
      { price: 40 },

      { price: 10 },
      { price: 10 },
    ];

    const EXPECT = [
      { price: 10 },
      { price: 10 },
      { price: 10 },
      { price: 10 },
    ];

    const actual = filterHouses(HOUSES, FILTERS);

    expect(actual).toEqual(EXPECT);
  });

  it('return only houses with number of bedrooms greater than BEDROOMS_FROM', () => {
    const BEDROOMS_FROM = 2;
    const FILTERS = { bedroomsFrom: BEDROOMS_FROM };

    const HOUSES = [
      { bedrooms: 1 },
      { bedrooms: 1 },

      { bedrooms: 2 },
      { bedrooms: 3 },
      { bedrooms: 3 },

      { bedrooms: 1 },
      { bedrooms: 1 },
    ];

    const EXPECT = [
      { bedrooms: 2 },
      { bedrooms: 3 },
      { bedrooms: 3 },
    ];

    const actual = filterHouses(HOUSES, FILTERS);

    expect(actual).toEqual(EXPECT);
  });

  it('return only houses with number or bedrooms less than BEDROOMS_TO', () => {
    const BEDROOMS_TO = 3;
    const FILTERS = { bedroomsTo: BEDROOMS_TO };

    const HOUSES = [
      { bedrooms: 4 },
      { bedrooms: 5 },

      { bedrooms: 2 },
      { bedrooms: 1 },
      { bedrooms: 1 },

      { bedrooms: 4 },
      { bedrooms: 4 },
    ];

    const EXPECT = [
      { bedrooms: 2 },
      { bedrooms: 1 },
      { bedrooms: 1 },
    ];

    const actual = filterHouses(HOUSES, FILTERS);

    expect(actual).toEqual(EXPECT);
  });

  it('return only houses with image', () => {
    const HAS_IMAGE = true;
    const FILTERS = { hasImage: HAS_IMAGE };

    const HOUSES = [
      { imageUrl: undefined },
      { imageUrl: undefined },
      { imageUrl: undefined },

      { imageUrl: '/a' },
      { imageUrl: '/b' },

      { imageUrl: undefined },
      { imageUrl: undefined },
    ];

    const EXPECT = [
      { imageUrl: '/a' },
      { imageUrl: '/b' },
    ];

    const actual = filterHouses(HOUSES, FILTERS);

    expect(actual).toEqual(EXPECT);
  });
});
