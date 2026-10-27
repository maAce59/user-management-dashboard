import React from "react";
import Header from "./components/Header"; // Fixed path (added slash)
import Footer from "./components/Footer"; // Fixed path (added slash)
import { Outlet } from "react-router-dom"; // Removed unused 'Link'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
