import React from "react";
import Layout from "@theme/Layout";
import {
  DocsSidebarProvider,
  DocsVersionProvider,
} from "@docusaurus/theme-common/internal";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DocSidebar from "@theme/DocSidebar";
import { ThemeClassNames } from "@docusaurus/theme-common";
import R from "@docusaurus/router";
import MainStyles from "@docusaurus/theme-classic/lib/theme/DocSidebar";

import Navbar from "@theme/Navbar";
import BlogLayout from "@theme/BlogLayout";
import Footer from "@theme/Footer";
// import MainStyles from "@docusaurus/theme-classic/lib/theme/DocPage/Layout/Main/styles.module.css";
// import DocPageStyles from "@docusaurus/theme-classic/lib/theme/DocPage/Layout/styles.module.css";
// import SidebarStyles from "@docusaurus/theme-classic/lib/theme/DocPage/Layout/Sidebar/styles.module.css";
// import DocItemColStyles from "@docusaurus/theme-classic/lib/theme/DocItem/Layout/styles.module.css";
// import DocItemStyles from "@docusaurus/theme-classic/lib/theme/TOC/styles.module.css";
// import DocBreadcrumbs from "@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/styles.module.css";

function MyCustomPage(props: any) {
  const customData = props.route.customData;
  const versionMetadata = props?.content?.docsCurrentMetadata;
  const sidebarName = "defaultSidebar";
  const sidebarItems = versionMetadata?.docsSidebars[sidebarName];

  const data = useDocusaurusContext();

  console.log("props", props);
  console.log("customData", typeof customData, customData);

  // console.log("globarData", data);
  // console.log("ThemeClassNames", ThemeClassNames);
  // console.log("MainStyles", MainStyles);
  //
  var pathname = props.location?.pathname;
  var a = Array.from(Object.values(customData));

  //@ts-ignore
  var htmlIndex = a?.findIndex((d) => d?.href === pathname);

  //@ts-ignore
  var html = htmlIndex != -1 ? (a ?? [])[htmlIndex]?.html : "";

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <aside className={ThemeClassNames.docs.docSidebarMenu}>
          {/* @ts-ignore */}
          <DocSidebar
            sidebar={[
              ...((data?.globalData?.gen?.default as any)?.sidebarData ?? []),
            ]}
          ></DocSidebar>
        </aside>
        <aside>
          <h4>{props.location.pathname}</h4>
          <p>HTML ở đây</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </aside>
      </div>
    </Layout>
  );
}

export default MyCustomPage;
