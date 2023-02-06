import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export interface optionsType {
  type: "png" | "jpeg";
  width: number;
  height: number;
  timeout: number;
  delay: number;
  fullPage: boolean;
  disableAnimations: boolean;
}

export default async function takeScreenshot(url: string, options: optionsType) {
  const chromePath =
    process.env.ISLOCALHOST === "TRUE"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : await chromium.executablePath;

  const browser = await puppeteer.launch({
    headless: true,
    args: chromium.args,
    ignoreHTTPSErrors: true,
    executablePath: chromePath,
  });

  const page = await browser.newPage();

  page.setDefaultTimeout(options.timeout * 1000);
  await page.setViewport({ width: options.width, height: options.height });
  await page.setBypassCSP(true);
  await page.setJavaScriptEnabled(true);

  if (options.disableAnimations) {
    await page.addStyleTag({
      content: "*,::before,::after{animation:initial !important;transition:initial !important;}",
    });
  }

  let base64;
  try {
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(options.delay * 1000);
    base64 = await page.screenshot({ type: options.type, fullPage: options.fullPage, encoding: "base64" });
  } catch (error) {
    console.error(error);
  } finally {
    if (browser !== null) await browser.close();
  }
  return base64;
}
