import React from "react";

function Custom(props: any) {
  console.log("po", props);

  return (
    <div>
      <h1>Custom</h1>
      <h4 style={{ color: "red" }}>{props.data.label}</h4>
      <p>{props.data.href}</p>
      <div dangerouslySetInnerHTML={{ __html: props.data.html ?? "" }}></div>
    </div>
  );
}

export default Custom;
