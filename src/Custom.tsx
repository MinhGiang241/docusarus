import React from "react";

function Custom({ data }: any) {
  console.log("po", data);

  return (
    <div>
      <h1>Custom</h1>
      <h4 style={{ color: "red" }}>{data.label}</h4>
      <p>{data.href}</p>

      <div dangerouslySetInnerHTML={{ __html: data.html ?? "" }}></div>
    </div>
  );
}

export default Custom;
