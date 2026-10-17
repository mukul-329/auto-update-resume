require("dotenv/config");
const { chromium } = require("playwright");

(async () => {
  console.log("Update Started...");
  const context = await chromium.launchPersistentContext("./naukri-profile", {
    headless: false,
  });
  const resumePath = process.env.RESUME_PATH;
  const naukriProfileUrl = process.env.NAUKRI_PROFILE_URL;

  let page;
  try {
    page = context.pages()[0];
    await page.goto(naukriProfileUrl);

    const fileInput = page.locator("input#attachCV[type='file']");
    await fileInput.setInputFiles(resumePath);

    const successMsgBox = page.locator("div.msgBox.success");
    await successMsgBox.waitFor({
      state: "visible",
      timeout: 10_000,
    });
    console.log("Resume Updated Successfully");
  } catch (err) {
    console.log("Something went wrong");
    throw err;
  } finally {
    await context.close();
  }
})();
