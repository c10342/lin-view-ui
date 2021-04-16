const content = "import './style.css';";

class WritePlugin {
  constructor(fileName) {
    this.fileName = fileName;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('WritePlugin', (compilation) => {
      const assets = compilation.assets;
      const entry = compiler.options.entry;
      for (const key in entry) {
        if (Object.hasOwnProperty.call(entry, key)) {
          assets[`${key}/${this.fileName || 'style.js'}`] = {
            source() {
              return content;
            },
            size() {
              return content.length;
            }
          };
        }
      }
    });
  }
}

module.exports = WritePlugin;
