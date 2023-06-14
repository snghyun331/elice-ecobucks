import { useState } from "react";
import SeoulDistricts from "../svg/seoulDistricts";
import SeoulUsageChart from "./SeoulUsageGraph";
import DistrictChart from "./DistrictChart";
const SeoulDistrictsGraph = () => {
    const [hoveredPath, setHoveredPath] = useState(null);
    const [idx, setIdx] = useState(0);
    const handleMouseEnter = (id) => {
        setHoveredPath(id);
    };
    
    const handleMouseLeave = () => {
        setHoveredPath(null);
    };
    const handleMouseClick = (id) => {
        // console.log("Clicked:", id);
        // ID에 따라 다른 동작을 수행할 수 있습니다.
        switch (id) {
            case "Dobong-gu":
                // console.log("도봉구를 클릭했습니다.");
                setIdx(10);
                break;
            case "Dongdaemun-gu":
                // console.log("동대문구를 클릭했습니다.");
                setIdx(11);
                break;
            case "Dongjak-gu":
                // console.log("동작구를 클릭했습니다.");
                setIdx(12);
                break;
            case "Eunpyeong-gu":
                // console.log("은평구를 클릭했습니다.");
                setIdx(22);
                break;
            case "Gangbuk-gu":
                // console.log("강북구를 클릭했습니다.");
                setIdx(3);
                break;
            case "Gangdong-gu":
                // console.log("강동구를 클릭했습니다.");
                setIdx(2);
                break;
            case "Gangseo-gu":
                // console.log("강서구를 클릭했습니다.");
                setIdx(4);
                break;
            case "Geumcheon-gu":
                // console.log("금천구를 클릭했습니다.");
                setIdx(8);
                break;
            case "Guro-gu":
                // console.log("구로구를 클릭했습니다.");
                setIdx(7);
                break;
            case "Gwanak-gu":
                // console.log("관악구를 클릭했습니다.");
                setIdx(5);
                break;
            case "Gwangjin-gu":
                // console.log("광진구를 클릭했습니다.");
                setIdx(6);
                break;
            case "Gangnam-gu":
                // console.log("강남구를 클릭했습니다.");
                setIdx(1);
                break;
            case "Jongno-gu":
                // console.log("종로구를 클릭했습니다.");
                setIdx(23);
                break;
            case "Jung-gu":
                // console.log("중구를 클릭했습니다.");
                setIdx(24);
                break;
            case "Jungnang-gu":
                // console.log("중랑구를 클릭했습니다.");
                setIdx(25);
                break;
            case "Mapo-gu":
                // console.log("마포구를 클릭했습니다.");
                setIdx(13);
                break;
            case "Nowon-gu":
                // console.log("노원구를 클릭했습니다.");
                setIdx(9);
                break;
            case "Seocho-gu":
                // console.log("서초구를 클릭했습니다.");
                setIdx(15);
                break;
            case "Seodaemun-gu":
                // console.log("서대문구를 클릭했습니다.");
                setIdx(14);
                break;
            case "Seongbuk-gu":
                // console.log("성북구를 클릭했습니다.");
                setIdx(17);
                break;
            case "Seongdong-gu":
                // console.log("성동구를 클릭했습니다.");
                setIdx(16);
                break;
            case "Songpa-gu":
                // console.log("송파구를 클릭했습니다.");
                setIdx(18);
                break;
            case "Yangcheon-gu":
                // console.log("양천구를 클릭했습니다.");
                setIdx(19);
                break;
            case "Yeongdeungpo-gu":
                // console.log("영등포구를 클릭했습니다.");
                setIdx(20);
                break;
            case "Yongsan-gu":
                // console.log("용산구를 클릭했습니다.");
                setIdx(21);
                break;


          default:
            break;
        }
      };

    return (
        <>
            <SeoulDistricts 
                hoveredPath={hoveredPath}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleMouseClick={handleMouseClick}
            />
            
            {idx === 0 ? <SeoulUsageChart /> : <DistrictChart idx={idx} /> }
            {/* <DistrictChart /> */}
            {/* <SeoulUsageChart /> */}
        </>
    )
}

export default SeoulDistrictsGraph;