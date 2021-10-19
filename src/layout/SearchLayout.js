import React from "react";
import Footer from "../components/Footer/";
import Header from "../components/Header/index";

function MainLayout(props) {
    
  return (
    <>
      <Header {...props} />
      <div className="main">{props.children}</div>
      <Footer isSearchPage={isSearchPage} />
    </>
  );
}

export default MainLayout;
