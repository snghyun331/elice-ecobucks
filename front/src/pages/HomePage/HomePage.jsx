import { Link } from "react-router-dom";
import { Container, Button, Dropdown, DropdownButton } from "react-bootstrap";
// import map from "../../../../data/seoul_map/seoulMap.png";
// import DomesticAverage from "../../../../data/DomesticAverage.png";
// import DomesticDistrict from "../../../../data/DomesticDistrict.png";
// import district1 from "../../../../data/seoul_map/district1.png";
// import district2 from "../../../../data/seoul_map/district2.png";
// import district3 from "../../../../data/seoul_map/district3.png";
// import district4 from "../../../../data/seoul_map/district4.png";
// import district5 from "../../../../data/seoul_map/district5.png";
// import Industry from "../../../../data/Industry.png";
import { useContext } from "react";
import { UserStateContext } from "../../context/user/UserProvider";

import BannerCarousel from "./BannerCarousel";
import TrendingBlogs from "./TrendingBlogs";
import TrendingChallenges from "./TrendingChallenges";
import Intro from './Intro';

import { useState } from "react";
import SeoulDistrictsGraph from "./Data/SeoulDistrictGraph";
import SeoulUsageChart from "./Data/SeoulUsageGraph";
import DistrictChart from "./Data/DistrictChart";
import districtInfo from "../../assets/districtInfo";

const HomePage = () => {
  const { user } = useContext(UserStateContext);

  if (!user) {
    return <Intro />;
  }
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          justifyContent: "center",
          paddingLeft: "140px",
          paddingRight: "140px",
          paddingTop: "150px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "70%",
            background: "#00D387",
            zIndex: -1,
          }}
        ></div>
        <Container>
          <BannerCarousel />
        </Container>

        <Container
          style={{
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #d6d6d6",
            borderRadius: "10px",
            boxShadow: "3px 3px 4px #ebebeb",
            padding: "20px",
            marginTop: "50px",
          }}
        >
          <h3>전력통계</h3>
          <div
            style={{
              marginTop: "18px",
              height: "5.5px",
              width: "120px",
              backgroundColor: "#FF6B00",
              borderRadius: "10px",
            }}
          >
            {" "}

          </div>

          <div
            className="btn-toolbar justify-content-md-end"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="d-flex gap-2 mx-auto justify-content-md-end">
              <SeoulDistrictsGraph />
              {/* <DistrictChart /> */}
            </div>
          </div> 
        </Container>

        <TrendingBlogs />
        <TrendingChallenges />
      </div>
      
    </div>
  );
};

export default HomePage;
