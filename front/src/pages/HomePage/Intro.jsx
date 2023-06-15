// Intro.js
import React from "react";
import "./Intro.css";
import ReactFullpage from "@fullpage/react-fullpage";

const Intro = () => (
  <ReactFullpage
    licenseKey={"YOUR_LICENSE_KEY"}
    scrollingSpeed={1000}
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section" style={{ backgroundColor: "#00D387" }}>
            <h1>ECOBUCKS : 절약하고 쇼핑해요</h1>
          </div>
          <div className="section" style={{ backgroundColor: "#94EBCD" }}>
            <h1>절약인증하고 마일리지를 모아요</h1>
          </div>
          <div className="section" style={{ backgroundColor: "#E0FFF1" }}>
            <h1>마일리지로 유통기한 임박 상품을 저렴하게 구입해요.</h1>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Intro;
