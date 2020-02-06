// DO NOT REMOVE EXAMPLE
// https://api.nestoria.co.uk/api
//     ?encoding=json
//     &pretty=1
//     &action=search_listings
//     &listing_type=buy

//     &place_name=london
//     &page=1

import { buildQuery } from '@/utils/buildQuery';

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
        console.error(`Bad request: ${code}`);
      } else {
        console.error(`Server respond with ${code} application responce code`);
      }
      return { houses: [], page };
    } catch (err) {
      console.error(err);
      return { houses: [], page };
    }
  },
};
