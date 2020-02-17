const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 8'];
const urlbase = 'https://www.amazon.co.jp/hz/wishlist/ls/';

async function getProductInfo(wishListId) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await initPage(browser);
    await page.goto(urlbase + wishListId);
    return await scrapePage(page);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    browser.close();
  }
}

async function initPage(browser) {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  // for logging
  page.on('console', msg => {
    for (let i = 0; i < msg._args.length; ++i)
      console.log(`${i}: ${msg._args[i]}`);
  });
  return page;
}

async function scrapePage(page) {
  return await page.evaluate(async () => {
    // scroll down until end of the list
    const distance = 400;
    const delay = 100;
    while (
      document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight &&
      !document.querySelector('#endOfListMarker')
    ) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(resolve => {
        setTimeout(resolve, delay);
      });
    }

    // then scrape all whish items
    const itemList = [];
    [...document.querySelectorAll('a[href^="/dp/"].a-touch-link')].forEach(
      el => {
        const productID = el
          .getAttribute('href')
          .split('/?coliid')[0]
          .replace('/dp/', '');
        const title = el.querySelector('[id^="item_title_"]').textContent;
        let price = -1;
        const priceEle = el.querySelector('[id^="itemPrice_"] > span');
        if (priceEle && priceEle.textContent) {
          price = Number(priceEle.textContent.replace('￥', '').replace(',', ''));
        }
        itemList.push({
          price: price,
          title: title,
          productID: productID
        });
      }
    );
    return itemList;
  });
}

exports.getProductInfo = getProductInfo;
