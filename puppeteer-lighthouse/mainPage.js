const { createBrowser, createReportWithBrowser } = require("./util");
const fs = require("fs");

(async () => {
  
  const browser = await createBrowser();
  const resultMain = await createReportWithBrowser(
    browser,
    "https://dev.buy-it.afj-solution.com",
    {
        output: "html"  
    }
  );

  const resultLogin = await createReportWithBrowser(
    browser,
    "https://dev.buy-it.afj-solution.com/login",
    {
        output: "html"  
    }
  );

  fs.writeFileSync("./report/report-main.html", resultMain.report, "utf-8");
  fs.writeFileSync("./report/report-login.html", resultLogin.report, "utf-8");

  await browser.close();
})()
    .catch(console.error)
    .then(() => {
       console.log("Finished!");
    });