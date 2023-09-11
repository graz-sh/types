const fs = require("fs/promises");
const path = require("path");

const packageJson = require("../package.json");

const prepack = async () => {
  packageJson.scripts = undefined;
  packageJson.devDependencies = undefined;
  packageJson.prettier = undefined;

  const dest = path.resolve(__dirname, "../package.json");
  await fs.writeFile(dest, `${JSON.stringify(packageJson, null, 2)}\n`, { encoding: "utf-8" });
};

void prepack();
