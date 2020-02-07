export default {
  async getHouses(city, page = 1) {
    const houses = [];
    const PAGE_SIZE = 20;
    for (let i = (page - 1) * PAGE_SIZE; i < PAGE_SIZE * page; i += 1) {
      // eslint-disable-next-line prefer-template
      houses.push({ title: i + city + ' xxxxx xxxxxxxxxxx xxxxxxxxx' });
    }

    return houses;
  },
};
