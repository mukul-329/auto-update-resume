import { chromium } from "playwright";
(async () => {
  console.log("Update Started...");
  const context = await chromium.launchPersistentContext("./naukri-profile", {
    headless: false,
  });

  try {
    const page = context.pages()[0];
    await page.goto("https://www.naukri.com/mnjuser/profile?id=&altresid");

    await page.getByRole("button", { name: "Update resume" }).click();

    const resumePath =
      "/Users/vaibhavjain/Desktop/obsidian vaults/Everything/vaibhav jain career RAG/resume-latex/Vaibhav Jain Resume.pdf";

    await page
      .getByRole("button", { name: "Upload resume" })
      .setInputFiles(resumePath);

    const waitSec = 3000;
    console.log("file uploaded.");
    console.log(`waiting for ${waitSec / 1000} sec`);
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
