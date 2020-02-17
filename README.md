# About
This is a sample of scraping Amazon.co.jp's wishlist.  
Only available to scrape open wishlist.  
Private wishlist can not scrape.

Detail is written at below link
https://qiita.com/nobu17/items/35419cb346a88c655770

# Usage

## call method

call `getProductInfo` function with wish list id

```javascript

const amazonWishScraper = require('./amazonWishScraper');
...
  const itemList = await amazonWishScraper.getProductInfo('92QVMALK2QVW');
  console.log('itemList', JSON.stringify(itemList));
...

```

## result object
If price is not existed(ex:sold out), value is -1

```json
[
    { "title" : "ProductA", "price": 3278, "productID": "429711111X" },
    { "title" : "ProductB", "price": -1, "productID": "429711111X" },
]
```

