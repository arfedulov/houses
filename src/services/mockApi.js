export default {
  async getHousesPage(city, page = 1) {
    const houses = [];
    const PAGE_SIZE = 20;
    const totalItems = 20 * 15;
    for (let i = (page - 1) * PAGE_SIZE; i < PAGE_SIZE * page; i += 1) {
      houses.push({
        title: `${i + city} xxxxx xxxxxxxxxxx xxxxxxxxx`,
        img_url: '/#',
        bedroom_number: 5,
        keywords: 'a b c d',
        price: 12345,
        price_currency: 'USD',
      });
    }

    return { houses, page, totalItems };
  },
};
