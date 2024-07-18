import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import Plugin from "./plugins/src/index";
import axios from "axios";
import path from "path";
//export default config;

const getFooter = async () => {
  try {
    var response = await axios.get(
      "https://api.tutorial.tmas.net.vn/apimodel/test.get_footer",
    );

    return response?.data?.data;
  } catch (e) {
    return {};
  }
};

export default async () => {
  var footer = await getFooter();
  const config: Config = {
    title: "My Site",
    tagline: "Dinosaurs are cool",
    favicon: "img/favicon.ico",
    // Set the production url of your site here
    url: "https://your-docusaurus-site.example.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",
    plugins: [
      // Plugin,
      async (context, options) => ({
        //@ts-ignore
        name: "ge",
        async loadContent() {
          return { root: "root" };
        },
        // lifecycle callback
        async contentLoaded({ content, actions }) {
          const { setGlobalData } = actions;
          setGlobalData({
            sidebarData: content,
            footerLinks: [],
          });

          await actions.addRoute({
            path: `/d`,
            component: require.resolve("./src/DynamicPage.tsx"),
            modules: {},
            customData: {
              type: "link",
              href: "/d",
              label: "custom",
            },
          });
        },
      }),
    ],

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "facebook", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    // i18n: {
    //   defaultlocale: "en",
    //   locales: ["en"],
    // },

    presets: [
      [
        "classic",
        {
          docs: {
            sidebarPath: "./sidebars.ts",
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          },
          theme: {
            customCss: "./src/css/custom.css",
          },
        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
          {
            href: "/d",
            label: "Dynamic",
            position: "left",
          },
        ],
      },
      // footer: footer as any,
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    } satisfies Preset.ThemeConfig,
  };

  return config;
};
