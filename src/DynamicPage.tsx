import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import {
  matchPath,
  Redirect,
  useHistory,
  useLocation,
} from "@docusaurus/router";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DocSidebar from "@theme/DocSidebar";
import axios from "axios";

import R from "@docusaurus/renderRoutes";
import routes from "@generated/routes";
import Custom from "./Custom";
import HomePage from "./HomePage";
import LayoutProvider from "@theme/Layout/Provider";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import NavbarItem from "@theme/NavbarItem";
import NavbarLayout from "@theme/Navbar/Layout";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarContent from "@theme/Navbar/Content";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import FooterLayout from "@theme/Footer/Layout";
import FooterLinksSimple from "@theme/Footer/Links/Simple";
import FooterLinks from "@theme/Footer/Links";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLogo from "@theme/Footer/Logo";

interface CustomSideBar {
  type?: string;
  href?: string;
  label?: string;
  html?: string;
}

function DynamicPage(props: any) {
  console.log("props", props);

  var footerItems = [
    {
      title: "Docs",
      items: [
        {
          label: "Tutorial",
          to: "/docs/intro",
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          label: "Stack Overflow",
          href: "https://stackoverflow.com/questions/tagged/docusaurus",
        },
        {
          label: "Discord",
          href: "https://discordapp.com/invite/docusaurus",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/docusaurus",
        },
      ],
    },
    {
      title: "More",
      items: [
        {
          label: "Blog",
          to: "/blog",
        },
        {
          label: "GitHub",
          href: "https://github.com/facebook/docusaurus",
        },
      ],
    },
  ];

  const [sideBars, setSideBars] = useState<CustomSideBar[]>([]);
  const getCustomSideBar = async () => {
    try {
      var res = await axios.get(
        "https://api.tutorial.tmas.net.vn/apimodel/test.custom_sidebar",
      );

      console.log("res SideBar", res);

      setSideBars(res?.data?.data);
    } catch (e) {
      return setSideBars([]);
    }
  };

  useEffect(() => {
    getCustomSideBar();
  }, []);

  return (
    <LayoutProvider>
      <NavbarLayout>
        <NavbarLogo />
        <DefaultNavbarItem label="docs" to={"/docs"} />
        <DefaultNavbarItem label="Dynamic" to={"/d"} />
        <DefaultNavbarItem label="custom-1" to={"/d/1"} />
        <DefaultNavbarItem label="custom-2" to={"/d/2"} />
        <DefaultNavbarItem label="custom-3" to={"/d/3"} />

        {/* <NavbarNavLink  label="Dynamic" isNavLink exact  /> */}

        <NavbarItem
          isNavLink
          value="/d"
          position="left"
          title="HHH"
          items={[
            {
              to: "/guides/",
              label: "Guides",
            },
            {
              to: "/api/ios",
              label: "iOS API",
            },
            {
              to: "/api/android",
              label: "Android API",
            },
          ]}
        ></NavbarItem>
      </NavbarLayout>
      <div style={{ display: "flex", minHeight: "900px" }}>
        <aside>
          {/* @ts-ignore */}
          <DocSidebar sidebar={sideBars}></DocSidebar>
        </aside>
        <aside>
          <Switch>
            <Route path={`/d`} render={() => <HomePage />} exact />
            {sideBars?.map((g) => (
              <Route
                path={g.href ?? ""}
                render={() => <Custom data={g} />}
                exact
              />
            ))}
          </Switch>
        </aside>
      </div>

      <FooterLayout
        style="dark"
        logo={<div></div>}
        links={<FooterLinks links={footerItems} />}
        copyright={<FooterCopyright copyright="OKKKK" />}
      />
    </LayoutProvider>
  );
}

export default DynamicPage;
