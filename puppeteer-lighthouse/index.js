const fs = require("fs");

if(!fs.existsSync("./report")) {
    fs.mkdirSync("./report");
    fs.appendFileSync("./report/report-main.html", "");
    fs.appendFileSync("./report/report-login.html", "");
}