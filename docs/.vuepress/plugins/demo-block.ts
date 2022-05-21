import vuepressDemoBlock from "vuepress2-plugin-demo-block";

const demoBlock = (options = {}) => {
  return (app) => {
    const ret = vuepressDemoBlock(options, app);
    return {
      name: "vuepress2-plugin-demo-block",
      ...ret
    };
  };
};

export default demoBlock;
