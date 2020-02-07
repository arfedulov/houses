import { buildQuery } from '@/utils/buildQuery';
import log from '@/logger';

const NESTORIA_URL = 'https://api.nestoria.co.uk/api';

const defaultParams = {
  encoding: 'json',
  action: 'search_listings',
  listing_type: 'buy',
};

export default {
  async getHouses(city, page = 1) {
    if (!city) {
      throw new Error('Missing required argument `city`');
    }
    try {
      const response = await fetch(
        NESTORIA_URL + buildQuery({ place_name: city, page, ...defaultParams }),
      );
      const data = await response.json();
      const code = data && data.response.application_response_code;
      if (code >= 100 && code < 200) {
        return { houses: data.response.listings, page };
      }
      if (code >= 900 && code < 1000) {
        log.error(`Bad request: ${code}`);
      } else {
        log.error(`Server respond with ${code} application responce code`);
      }
      return { houses: [], page };
    } catch (err) {
      log.error(err);
      return { houses: [], page };
    }
  },
};
