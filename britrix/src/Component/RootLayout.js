import React from "react";
import NavbarComp from "./NavbarComp";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <NavbarComp />
      <Outlet />
    </>
  );
};

export default RootLayout;
