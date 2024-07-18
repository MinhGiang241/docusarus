import axios from "axios";
import React, { useEffect, useState } from "react";
import MDXComponents from "@theme/MDXComponents";
import { MDXProvider } from "@mdx-js/react";
import MDXContent from "@theme/MDXContent";
import ReactMarkdown from "react-markdown";

function Custom(props: any) {
  console.log("po", props);

  const [html, setHtml] = useState<string | undefined>();
  const getHtml = async () => {
    try {
      var res: any = await axios.post(
        "https://api.tutorial.tmas.net.vn/apimodel/webcontent.getContent",
        { href: props.data?.href },
      );
      console.log("res", res);

      if (res?.data.code != 0) {
        return;
      }
      setHtml(res?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getHtml();
  }, [props.data?.href]);

  return (
    <div>
      <ReactMarkdown>{html}</ReactMarkdown>
      {/* <div dangerouslySetInnerHTML={{ __html: html ?? "" }}></div> */}
    </div>
  );
}

export default Custom;
