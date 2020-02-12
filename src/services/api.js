import { buildQuery } from '@/utils/buildQuery';
import log from '@/logger';

const NESTORIA_URL = 'https://api.nestoria.co.uk/api';

const defaultParams = {
  encoding: 'json',
  action: 'search_listings',
  listing_type: 'buy',
  number_of_results: 20,
};

export default {
  async getHousesPage(city, page = 1) {
    if (!city) {
      throw new Error('Missing required argument `city`');
    }
    try {
      const response = await fetch(
        NESTORIA_URL + buildQuery({ ...defaultParams, place_name: city, page }),
      );
      const data = await response.json();
      const {
        application_response_code: code,
        listings: houses,
        total_results: totalItems,
      } = data.response;
      if (code >= 100 && code < 200) {
        return { houses, totalItems, page };
      }
      if (code >= 900 && code < 1000) {
        log.error(`Bad request: ${code}`);
      } else {
        log.error(`Server respond with ${code} application responce code`);
      }
    } catch (err) {
      log.error(err);
    }
    return {
      houses: [],
      totalItems: 0,
      page,
    };
  },
};
