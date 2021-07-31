import React, { useState } from "react";

export const Test = () => {
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        height: 1500,
        background: "#00a3ab",
      }}
    >
      <div
        style={{
          background: "#00ff08",
          position: "sticky",
          top: 0,
          height: 100,
          width: 500,

          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div>test</div>
      </div>

      <div
        style={{
          height: 800,
          background: "#827aff",
        }}
      ></div>
    </div>
  );
};
