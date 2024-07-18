// @ts-nocheck
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
  id?: string;
  items?: CustomSideBar[];
}

interface CustomNavBar {
  label?: string;
  href?: string;
  id?: string;
}

interface CustomRoute {
  type?: string;
  href?: string;
  label?: string;
}

function DynamicPage(props: any) {
  console.log("props", props);
  const [sideBars, setSideBars] = useState<CustomSideBar[]>([]);
  const [navBars, setNavBars] = useState<CustomNavBar[]>([]);
  const [footerItems, setFooterItems] = useState<any | undefined>();
  const [links, setLinks] = useState<CustomRoute[]>([]);

  const getFooter = async () => {
    try {
      var response = await axios.get(
        "https://api.tutorial.tmas.net.vn/apimodel/test.get_footer",
      );
      console.log("res SideBar", response);
      setFooterItems(response?.data?.data);
    } catch (e) {
      setFooterItems(undefined);
    }
  };

  const getLinkres = (sidebar: CustomSideBar[]) => {
    let L = [];

    for (let i of sidebar) {
      if (i.type == "link") {
        L.push(i);
      } else if (i.type == "category" && i.items) {
        L = [...L, ...getLinkres(i?.items)];
      }
    }
    return L;
  };

  const getCustomSideBar = async () => {
    try {
      var res = await axios.get(
        "https://api.tutorial.tmas.net.vn/apimodel/test.custom_sidebar",
      );

      setSideBars(res?.data?.data?.sideBars);
      setNavBars(res?.data?.data?.navBars);
      var L = [];
      console.log(
        "getLinkres(res?.data?.data?.sideBars)",
        getLinkres(res?.data?.data?.sideBars),
      );

      L = [...L, ...getLinkres(res?.data?.data?.sideBars)];

      for (let j of res?.data?.data?.navBars) {
        var index = L.findIndex((e) => e.href === j.href);
        if (index === -1) {
          L.push(j);
        }
      }

      console.log("L", L);

      setLinks(L);
    } catch (e) {
      setNavBars([]);
      setSideBars([]);
      setLinks([]);
    }
  };

  useEffect(() => {
    getCustomSideBar();
    getFooter();
  }, []);

  return (
    <LayoutProvider>
      <NavbarLayout>
        <NavbarLogo />
        {navBars?.map((e) => (
          <DefaultNavbarItem label={e?.label} to={e?.href} />
        ))}

        {/* <NavbarNavLink  label="Dynamic" isNavLink exact  /> */}
        {/* <NavbarItem */}
        {/*   isNavLink */}
        {/*   value="/d" */}
        {/*   position="left" */}
        {/*   title="HHH" */}
        {/*   items={[ */}
        {/*     { */}
        {/*       to: "/guides/", */}
        {/*       label: "Guides", */}
        {/*     }, */}
        {/*     { */}
        {/*       to: "/api/ios", */}
        {/*       label: "iOS API", */}
        {/*     }, */}
        {/*     { */}
        {/*       to: "/api/android", */}
        {/*       label: "Android API", */}
        {/*     }, */}
        {/*   ]} */}
        {/* ></NavbarItem> */}
      </NavbarLayout>
      <div style={{ display: "flex", minHeight: "900px" }}>
        <aside>
          {/* @ts-ignore */}
          <DocSidebar sidebar={sideBars}></DocSidebar>
        </aside>
        <aside>
          <Switch>
            <Route path={`/d`} render={() => <HomePage />} exact />
            {links?.map((g) => (
              <Route
                path={g.href ?? ""}
                render={() => <Custom data={g} />}
                exact
              />
            ))}
          </Switch>
        </aside>
      </div>

      {footerItems && (
        <FooterLayout
          style="dark"
          logo={
            footerItems?.logo ? (
              <div>
                <img width={100} height={100} src={footerItems?.logo} />
              </div>
            ) : (
              <div />
            )
          }
          links={<FooterLinks links={footerItems?.items ?? []} />}
          copyright={<FooterCopyright copyright={footerItems?.copyright} />}
        />
      )}
    </LayoutProvider>
  );
}

export default DynamicPage;
