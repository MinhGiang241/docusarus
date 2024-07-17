import axios from "axios";

interface CustomSideBar {
  type?: string;
  href?: string;
  label?: string;
  html?: string;
}

const getCustomSideBar = async () => {
  try {
    var res = await axios.get(
      "https://api.tutorial.tmas.net.vn/apimodel/test.custom_sidebar",
    );

    console.log("res SideBAr", res);

    return res?.data?.data;
  } catch (e) {
    return [];
  }
};

export default async function (context, options) {
  return {
    // a unique name for this plugin
    name: "gen",
    // lifecycle callback
    async loadContent() {
      var customSideBar: CustomSideBar[] = await getCustomSideBar();
      console.log("customSideBar", customSideBar);

      var sideBar = customSideBar?.map((e) => ({
        type: e.type,
        href: e.href,
        label: e.label,
      }));
      // we can make some async/await API calls here
      // or load data from a database
      return customSideBar;
    },
    // lifecycle callback
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData({
        sidebarData: content,
        footerLinks: [],
      });

      await actions.addRoute({
        path: `/c`,
        component: require.resolve("../../src/MyCustomPage.tsx"),
        modules: {},
        customData: { ...content, type: "link", href: "/c", label: "custom" },
      });

      for (const page of content) {
        console.log("page", page);

        await actions.addRoute({
          path: `/${page.href}`,
          component: require.resolve("../../src/MyCustomPage.tsx"),
          modules: {},
          customData: { html: page.html, l: "Hello" },
        });
      }
    },
  };
}
