// Intro.js
import React, { useEffect } from "react";
import "./Intro.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Intro = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const style = {
    minHeight: "100vh",
    minWidth: '100vw'
  };

  return (
    <div className="container">
      <div className="page" style={{ ...style, backgroundColor: "#00D387" }}>
        <h1 data-aos="fade-up">ECOBUCKS : 절약하고 쇼핑해요</h1>
      </div>
      <div className="page" style={{ ...style, backgroundColor: "#94EBCD" }}>
        <h1 data-aos="fade-up">절약인증하고 마일리지를 모아요</h1>
      </div>
      <div className="page" style={{ ...style, backgroundColor: "#E0FFF1" }}>
        <h1 data-aos="fade-up">마일리지로 유통기한 임박 상품을 저렴하게 구입해요.</h1>
      </div>
    </div>
  );
};

export default Intro;
