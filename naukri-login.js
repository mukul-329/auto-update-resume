const { chromium } = require("playwright");

(async () => {
  const context = await chromium.launchPersistentContext("./naukri-profile", {
    headless: false,
  });

  try {
    const page = context.pages()[0];

    await page.goto("https://www.naukri.com/");

    // Pause so you can log in manually.
    await page.pause();
  } finally {
    await context.close();
  }
})();
