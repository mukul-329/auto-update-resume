require("dotenv/config");
const { chromium } = require("playwright");

(async () => {
  console.log("Update Started...");
  const context = await chromium.launchPersistentContext("./naukri-profile", {
    headless: false,
  });
  const resumePath = process.env.RESUME_PATH;
  const naukriProfileUrl = process.env.NAUKRI_PROFILE_URL;

  try {
    const page = context.pages()[0];
    await page.goto(naukriProfileUrl);

    await page.getByRole("button", { name: "Update resume" }).click();

    await page
      .getByRole("button", { name: "Upload resume" })
      .setInputFiles(resumePath);

    const waitSec = 3000;
    console.log("file uploaded.");
    console.log(`Waiting to upload for ${waitSec / 1000} sec`);
    await page.waitForTimeout(waitSec);
    console.log("Resume Updated successfully");
    // Wait for the upload process to finish before closing.
    // Add a site-specific success assertion here if available.
  } catch (err) {
    console.log("Something went wrong");
    throw err;
  } finally {
    await context.close();
  }
})();
