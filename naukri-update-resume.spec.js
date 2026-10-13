import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

test("Update Naukri resume", async () => {
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

    // Wait for the upload process to finish before closing.
    // Add a site-specific success assertion here if available.
  } finally {
    await context.close();
  }
});
