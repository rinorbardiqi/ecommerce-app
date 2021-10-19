import React from "react";
import Button from "../UI/Button";
import "./styles.scss";
function LoadMore({ onLoadMoreEvt = () => {} }) {
  return (
    <>
      <div className="BtnLoadMore">
        <Button onClick={onLoadMoreEvt}>Load More</Button>
      </div>
      <div className="marginBtn" />
    </>
  );
}

export default LoadMore;
