const amazonWishScraper = require('./amazonWishListScraper');

async function main() {
  const itemList = await amazonWishScraper.getProductInfo('92QVMALK2QVW');
  console.log('itemList', JSON.stringify(itemList));
}

main();
