import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

test("verify if naukri resume updated", async () => {
  const context = await chromium.launchPersistentContext("./naukri-profile", {
    headless: false,
  });

  try {
    const page = context.pages()[0];
    await page.goto("https://www.naukri.com/mnjuser/profile?id=&altresid");
    const content = await page.locator(".updateOn").innerText();
    console.log("Upload status:", content);

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    console.log("Today:", today);

    expect(content).toContain(today);
  } finally {
    await context.close();
  }
});
