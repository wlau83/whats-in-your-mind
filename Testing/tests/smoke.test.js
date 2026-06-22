import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:5173";
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;
const HEADLESS = process.env.HEADLESS === "true";

if (!TEST_EMAIL || !TEST_PASSWORD) {
  console.error("Missing TEST_EMAIL or TEST_PASSWORD in .env");
  process.exit(1);
}

const waitTime = 10000;

async function runSmokeTest() {
  const options = new chrome.Options();

  if (HEADLESS) {
    options.addArguments("--headless=new");
  }

  options.addArguments("--window-size=1280,900");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    const thoughtText = `Selenium smoke test ${Date.now()}`;

    // 1. Login
    await driver.get(`${BASE_URL}/login`);

    const emailInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-email"]')),
      waitTime
    );
    await emailInput.sendKeys(TEST_EMAIL);

    await driver
      .findElement(By.css('[data-testid="login-password"]'))
      .sendKeys(TEST_PASSWORD);

    await driver.findElement(By.css('[data-testid="login-submit"]')).click();

    // 2. Verify dashboard
    await driver.wait(until.urlContains("/dashboard"), waitTime);
    await driver.wait(
      until.elementLocated(By.css('[data-testid="dashboard-page"]')),
      waitTime
    );

    // 3. Create thought
    await driver
      .findElement(By.css('[data-testid="thought-content"]'))
      .sendKeys(thoughtText);

    const tagInputs = await driver.findElements(
      By.css('[data-testid="thought-tags"]')
    );

    if (tagInputs.length > 0) {
      await tagInputs[0].sendKeys("selenium, smoke");
    }

    await driver.findElement(By.css('[data-testid="thought-submit"]')).click();

    // 4. Verify created thought appears
    await driver.wait(
      until.elementLocated(By.xpath(`//*[contains(text(), "${thoughtText}")]`)),
      waitTime
    );

    // 5. Search thought
    const searchInput = await driver.findElement(
      By.css('[data-testid="search-input"]')
    );

    await searchInput.clear();
    await searchInput.sendKeys("Selenium smoke test");

    await driver.wait(
      until.elementLocated(By.xpath(`//*[contains(text(), "${thoughtText}")]`)),
      waitTime
    );

    // 6. Logout
    await driver.findElement(By.css('[data-testid="logout-button"]')).click();

    await driver.wait(until.urlContains("/login"), waitTime);

    console.log("✅ Smoke test passed: login, create thought, search, logout");
  } catch (error) {
    console.error("❌ Smoke test failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await driver.quit();
  }
}

runSmokeTest();