import React from "react";

const Loading = () => {
  return (
    <div
      className="Loading"
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1,
        backgroundColor: "#0000003b",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img src="/Loading.gif" alt="" />
    </div>
  );
};

export default Loading;
