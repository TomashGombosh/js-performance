const lighthouse = require("lighthouse"); 
const puppeteer = require("puppeteer");

function createBrowser() {
    return puppeteer.launch({
      args: [
        "--show-paint-rects", 
      ],
    });
 }

function createReportWithBrowser(browser, url, options = { output: "html",  }) {
  const endpoint = browser.wsEndpoint(); 
  const endpointURL = new URL(endpoint); 
  return lighthouse(
    url,
    Object.assign({}, {
      port: endpointURL.port,
      disableDeviceEmulation: true,
      chromeFlags: [
        "--disable-mobile-emulation", 
        "--disable-storage-reset", 
      ]
    }, options)
  );
}

module.exports = { createBrowser, createReportWithBrowser };
