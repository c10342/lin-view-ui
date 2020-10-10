const temp = "import './style.css'";
const fs = require("fs");
const path = require("path");

const resolve = (dir) => path.resolve(__dirname, "../", dir);

const getLibEntries = (pathStr) => {
  let files = fs.readdirSync(resolve(pathStr));
  let entry = [];
  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item === "assets" || item === "index.js" || item === "style.css") {
    } else {
      const itemPath = path.join(pathStr, item, "./style.js");
      entry.push(resolve(itemPath));
    }
  }

  return entry;
};
const list = getLibEntries("lib");
for (let i = 0; i < list.length; i++) {
  fs.writeFileSync(list[i], temp);
}
