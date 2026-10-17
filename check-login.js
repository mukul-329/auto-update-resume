const { chromium } = require("playwright");

(async () => {
  const context = await chromium.launchPersistentContext("./naukri-profile", {
    headless: false,
  });

  const page = context.pages()[0];

  await page.goto("https://www.naukri.com/");

  // Keep the browser open so you can inspect it.
  await page.pause();

  await context.close();
})();
