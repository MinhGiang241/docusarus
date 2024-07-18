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
  const c = {
    ...config,
    prism: {
      theme: prismThemes[res.theme],
      darkTheme: prismThemes[res.theme],
    },
  };
  // prism: {
  //        theme: prismThemes.github,
  //        darkTheme: prismThemes.dracula,
  //      },

  return config;
};
