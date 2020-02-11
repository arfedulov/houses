import API from '@/services/api';

jest.mock('@/logger', () => ({ error: jest.fn() }));

describe('API', () => {
  afterAll(() => {
    global.fetch = undefined;
  });

  describe('API respond with some data (no matter what status code)', () => {
    beforeEach(() => {
      const RESPONSE = {
        response: {
          listings: [],
        },
      };
      global.fetch = jest.fn(async () => ({ json: async () => RESPONSE }));
    });

    it('return promise with value `{ houses: <array>, page: <number> }`', async () => {
      const CITY = 'moscow';
      const result = await API.getHousesPage(CITY);

      expect(Array.isArray(result.houses)).toBe(true);
      expect(typeof result.page).toBe('number');
    });
  });

  describe('API respond with success status code', () => {
    const HOUSES = [
      { title: 'aaaaa' },
      { title: 'bbbb' },
      { title: 'cccccc' },
      { title: 'ddddd' },
    ];

    beforeEach(() => {
      const RESPONSE = {
        response: {
          application_response_code: 100,
          listings: [...HOUSES],
        },
      };
      global.fetch = jest.fn(async () => ({ json: async () => RESPONSE }));
    });

    it('grab `response.listings` list from response and return it as `houses` prop', async () => {
      const CITY = 'moscow';
      const result = await API.getHousesPage(CITY);

      const EXPECT = { houses: HOUSES, page: 1 };

      expect(result).toEqual(EXPECT);
    });
  });
});
