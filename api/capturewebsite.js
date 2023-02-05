import puppeteer from "puppeteer-core";

import chromium from "chrome-aws-lambda";

export default async function takeScreenshot(url, options) {
  const chromePath =
    process.env.VERCEL === "0"
      ? await chromium.executablePath
      : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  const browser = await puppeteer.launch({
    headless: true,
    args: chromium.args,
    ignoreHTTPSErrors: true,
    executablePath: chromePath,
  });

  const page = await browser.newPage();

  page.setDefaultTimeout(options.timeout * 1000);
  await page.setBypassCSP(true);
  await page.setJavaScriptEnabled(true);
  await page.setViewport({ width: options.width, height: options.height });
  await page.waitForTimeout(options.delay * 1000);

  if (options.disableAnimations) {
    await page.addStyleTag({
      content: "*,::before,::after{animation:initial !important;transition:initial !important;}",
    });
  }

  let base64;
  try {
    await page.goto(url, { waitUntil: "load" });
    base64 = await page.screenshot({ type: options.type, fullPage: options.fullPage, encoding: "base64" });
  } catch (error) {
    console.error(error);
  } finally {
    if (browser !== null) await browser.close();
  }
  return base64;
}

module.exports = async (req, res) => {
  const start = Date.now();
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (
    !req.body ||
    !req.body.url ||
    !req.body.type ||
    !req.body.width ||
    !req.body.height ||
    !req.body.delay ||
    !req.body.timeout ||
    !req.body.fullPage ||
    !req.body.disableAnimations
  )
    return res.json({ status: false, message: "Needed request body is empty!" });

  try {
    const base64 = await takeScreenshot(req.body.url, {
      type: req.body.type,
      width: JSON.parse(req.body.width),
      height: JSON.parse(req.body.height),
      delay: JSON.parse(req.body.delay),
      timeout: JSON.parse(req.body.timeout),
      fullPage: JSON.parse(req.body.fullPage),
      disableAnimations: JSON.parse(req.body.disableAnimations),
    });
    const end = Date.now();

    if (base64 === undefined) return res.json({ status: false, message: `Website ${req.body.url} unaccessible!` });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    return res.json({
      status: true,
      data: { base64, url: req.body.url, type: req.body.type, runtime: (end - start) / 1000 },
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: false, message: `Website ${req.body.url} unaccessible!` });
  }
};
