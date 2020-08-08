const inquirer = require("inquirer");

const path = require("path");

const fs = require("fs");

const semver = require("semver");

const shelljs = require("shelljs");

const userInfo = require("./config.js");

const packageJsonPath = path.resolve(process.cwd(), "package.json");

const packageJson = require(packageJsonPath);

const packageJsonVersion = packageJson.version;

const verOptList = getVersionOptions(packageJsonVersion);

// 发布地址
const originRegistry = "https://registry.npmjs.org/";

// 检查npm是否存在
if (!shelljs.which("npm")) {
  shell.echo("Sorry, this script requires npm");
  shell.exit(1);
}

// npm who am i  检查是否已经登陆了
// >nul 2>nul   屏蔽输出
const isLogin = shelljs.exec("npm who am i >nul 2>nul").code === 0;

// npm config get registry
const registry = shelljs.exec("npm config get registry").stdout;

const promptParams = [
  {
    name: "version",
    message: `选择将要升级的版本(当前版本 ${packageJsonVersion} )：`,
    type: "list",
    default: 0,
    choices: verOptList,
  },
];

if (isLogin !== 0 && userInfo) {
  if (!userInfo.userName) {
    promptParams.push({
      name: "userName",
      message: "npm userName",
      type: "input",
    });
  }
  if (!userInfo.password) {
    promptParams.push({
      name: "password",
      message: "npm password",
      type: "input",
    });
  }
  if (!userInfo.email) {
    promptParams.push({
      name: "email",
      message: "npm email",
      type: "input",
    });
  }
}

inquirer.prompt(promptParams).then(async (answer) => {
  if (!isLogin) {
    const userName = answer.userName || userInfo.userName;
    const password = answer.password || userInfo.password;
    const email = answer.email || userInfo.email;
    await npmLogin(userName, password, email);
  }
  packageJson.version = answer.version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  let execStr = "npm publish";
  if (originRegistry !== registry) {
    execStr += ` && npm config set registry ${registry}`;
  }

  const result = shelljs.exec(execStr);
  if (result.code !== 0) {
    console.log(result.stderr);
    handleError();
  }

  shelljs.exit(1);
});

/**
 * 登录
 * @param {string} userName
 * @param {string} password
 * @param {string} email
 */
function npmLogin(userName, password, email) {
  return new Promise((resolve, reject) => {
    if (registry !== originRegistry) {
      shelljs.exec(`npm config set registry ${originRegistry}`);
    }
    const inputArray = [userName + "\n", password + "\n", email + "\n"];
    const child = shelljs.exec("npm login", { async: true });

    child.stdout.on("data", () => {
      const cmd = inputArray.shift();
      if (cmd) {
        shelljs.echo("input " + cmd);
        child.stdin.write(cmd);
      } else {
        child.stdin.end();
        resolve();
      }
    });
    child.stdout.on("error", reject);
  });
}

/**
 * 获取升级版本列表
 * @param {string} version
 */
function getVersionOptions(version) {
  version = version.split("+");

  const currentVersion = version[0];
  const levels = ["patch", "minor", "major"];
  let opts = [];

  levels.forEach(function(item) {
    const val = semver.inc(currentVersion, item);
    opts.push({
      name: val,
      value: val,
    });
  });

  return opts;
}

const handleError = () => {
  if (packageJsonVersion) {
    packageJson.version = packageJsonVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
  process.exit(1);
};

process.on("uncaughtException", function(e) {
  console.log("uncaughtException");
  console.log(e);
  handleError();
});

process.on("unhandledRejection", function(a, b) {
  console.log("unhandledRejection");
  console.log(a, b);
  handleError();
});
