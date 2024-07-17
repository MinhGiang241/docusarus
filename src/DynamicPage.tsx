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

interface CustomSideBar {
  type?: string;
  href?: string;
  label?: string;
  html?: string;
}

function DynamicPage(props: any) {
  console.log("props", props);
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
    <Layout title="Page Title">
      <div style={{ display: "flex" }}>
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
    </Layout>
  );
}

export default DynamicPage;
