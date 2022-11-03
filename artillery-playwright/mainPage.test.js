module.exports = { mainPageFlow, mainPageMobileFlow };

async function mainPageFlow (page) {
  await page.goto("https://dev.buy-it.afj-solution.com/");
  await page.locator("[href='/login']").click();
  await page.waitForSelector("#username");
  await page.locator("[href='/my/cart']").click();
};

async function mainPageMobileFlow (page) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("https://dev.buy-it.afj-solution.com/");
    await page.locator("#root > div > div> div > button").click();
    await page.locator("[role='presentation'] [href='/login']").click();
    await page.waitForSelector("#username");
    await page.locator("#root > div > div> div > button").click();
    await page.locator("[role='presentation'] [href='/my/cart']").click();
  };
