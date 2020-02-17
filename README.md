# About
This is a sample of scraping Amazon.co.jp's wishlist.  
Only available to scrape open wishlist.  
Private wishlist can not scrape.

# Usage

## call method

call `getProductInfo` function with whish list id

```javascript

const amazonWishScraper = require('./amazonWishScraper');
...
  const itemList = await amazonWishScraper.getProductInfo('92QVMALK2QVW');
  console.log('itemList', JSON.stringify(itemList));
...

```

## result object

```json
[
    { "title" : "ProductA", "price": 3278, "productID": "429711111X" },
    // if price is not existed(ex:sold out) value is -1
    { "title" : "ProductB", "price": -1, "productID": "429711111X" }, 
    ...
]
```
