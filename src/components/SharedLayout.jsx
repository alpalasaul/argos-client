import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";

const SharedLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar2/>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default SharedLayout;
