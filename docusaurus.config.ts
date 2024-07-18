import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import Plugin from "./plugins/src/index";
import axios from "axios";
import path from "path";
//export default config;

const getConfig = async () => {
  try {
    var response = await axios.get(
      "https://api.tutorial.tmas.net.vn/apimodel/webcontent.get_config",
    );

    return response?.data?.data;
  } catch (e) {
    return {};
  }
};

export default async () => {
  var res = await getConfig();
  const config: Config = res.config;
  var themeConfig = config.themeConfig;
  var newThemeConfig = {
    ...themeConfig,
    prism: {
      theme: prismThemes[res.theme],
      darkTheme: prismThemes[res.theme],
    },
  };

  const c = {
    ...config,
    themeConfig: newThemeConfig,
  };
  // prism: {
  //        theme: prismThemes.github,
  //        darkTheme: prismThemes.dracula,
  //      },

  return c;
};
