import React from "react";

export default function Editor({ code }) {
  return (
    <pre
      style={{
        height: "100%",
        margin: 0,
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <code>{code}</code>
    </pre>
  );
}