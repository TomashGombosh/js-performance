const fs = require("fs");

if(!fs.existsSync("./report"))
    fs.mkdirSync("./report");