const custom = require("../config-overrides");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  webpackFinal: (storybookConfig) => {
    const customConfig = custom(storybookConfig);
    return {
      ...storybookConfig,
      module: { ...storybookConfig.module, rules: customConfig.module.rules }
    };
  }
};
