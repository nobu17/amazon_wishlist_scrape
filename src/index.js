const amazonWishScraper = require('./amazonWishListScraper');

async function main() {
  const itemList = await amazonWishScraper.getProductInfo('145VXU80F2LO1');
  console.log('itemList', JSON.stringify(itemList));
}

main();
