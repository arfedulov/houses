export default {
  async getHousesPage(city, page = 1) {
    const houses = [];
    const PAGE_SIZE = 20;
    const totalItems = 20 * 15;
    for (let i = (page - 1) * PAGE_SIZE; i < PAGE_SIZE * page; i += 1) {
      houses.push({
        title: `${i + city} xxxxx xxxxxxxxxxx xxxxxxxxx`,
        img_url: 'https://imgs.nestimg.com/2_bedroom_flat_for_sale_in_27_st_mark_street_e1_london_3040071581245397211.jpg',
        bedroom_number: 5,
        keywords: 'a b c d',
        price: 12345,
        price_currency: 'USD',
      });
    }

    return { houses, page, totalItems };
  },
};
