// DO NOT REMOVE EXAMPLE
// https://api.nestoria.co.uk/api
//     ?encoding=json
//     &pretty=1
//     &action=search_listings
//     &listing_type=buy

//     &place_name=london
//     &page=1

const NESTORIA_URL = 'https://api.nestoria.co.uk/api';

const buildQuery = (params) => {
  let q = '?';
  Object.entries(params).forEach((pair) => {
    q += `${pair[0]}=${pair[1]}&`;
  });
  q = q.slice(0, q.length - 1);
  return q;
};

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
      const response = await fetch(NESTORIA_URL + buildQuery({ city, page, ...defaultParams }));
      const code = response.application_response_code;
      if (code >= 100 && code < 200) {
        return { houses: response.listings, page };
      }
      console.error(`Server respond with ${code} application responce code`);
      return { houses: [], page };
    } catch (err) {
      console.error(err);
      return { houses: [], page };
    }
  },
};
