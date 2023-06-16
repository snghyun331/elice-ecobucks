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
                console.log("도봉구를 클릭했습니다.");
                setIdx("도봉구");
                break;
            case "Dongdaemun-gu":
                console.log("동대문구를 클릭했습니다.");
                setIdx("동대문구");
                break;
            case "Dongjak-gu":
                console.log("동작구를 클릭했습니다.");
                setIdx("동작구");
                break;
            case "Eunpyeong-gu":
                console.log("은평구를 클릭했습니다.");
                setIdx("은평구");
                break;
            case "Gangbuk-gu":
                console.log("강북구를 클릭했습니다.");
                setIdx("강북구");
                break;
            case "Gangdong-gu":
                console.log("강동구를 클릭했습니다.");
                setIdx("강동구");
                break;
            case "Gangseo-gu":
                console.log("강서구를 클릭했습니다.");
                setIdx("강서구");
                break;
            case "Geumcheon-gu":
                console.log("금천구를 클릭했습니다.");
                setIdx("금천구");
                break;
            case "Guro-gu":
                console.log("구로구를 클릭했습니다.");
                setIdx("구로구");
                break;
            case "Gwanak-gu":
                console.log("관악구를 클릭했습니다.");
                setIdx("관악구");
                break;
            case "Gwangjin-gu":
                console.log("광진구를 클릭했습니다.");
                setIdx("광진구");
                break;
            case "Gangnam-gu":
                console.log("강남구를 클릭했습니다.");
                setIdx("강남구");
                break;
            case "Jongno-gu":
                console.log("종로구를 클릭했습니다.");
                setIdx("종로구");
                break;
            case "Jung-gu":
                console.log("중구를 클릭했습니다.");
                setIdx("중구");
                break;
            case "Jungnang-gu":
                console.log("중랑구를 클릭했습니다.");
                setIdx("중랑구");
                break;
            case "Mapo-gu":
                console.log("마포구를 클릭했습니다.");
                setIdx("마포구");
                break;
            case "Nowon-gu":
                console.log("노원구를 클릭했습니다.");
                setIdx("노원구");
                break;
            case "Seocho-gu":
                console.log("서초구를 클릭했습니다.");
                setIdx("서초구");
                break;
            case "Seodaemun-gu":
                console.log("서대문구를 클릭했습니다.");
                setIdx("서대문구");
                break;
            case "Seongbuk-gu":
                console.log("성북구를 클릭했습니다.");
                setIdx("성북구");
                break;
            case "Seongdong-gu":
                console.log("성동구를 클릭했습니다.");
                setIdx("성동구");
                break;
            case "Songpa-gu":
                console.log("송파구를 클릭했습니다.");
                setIdx("송파구");
                break;
            case "Yangcheon-gu":
                console.log("양천구를 클릭했습니다.");
                setIdx("양천구");
                break;
            case "Yeongdeungpo-gu":
                console.log("영등포구를 클릭했습니다.");
                setIdx("영등포구");
                break;
            case "Yongsan-gu":
                console.log("용산구를 클릭했습니다.");
                setIdx("용산구");
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
            {idx === "서초구" ? <span>서초구 전력사용량이 많아서 어쩌구 저쩌구서초구 전력사용량이 많아서 어쩌구 저쩌구서초구 전력사용량이 많아서 어쩌구 저쩌구<br />서초구 전력사용량이 많아서 어쩌구 저쩌구<br />서초구 전력사용량이 많아서 어쩌구 저쩌구<br />서초구 전력사용량이 많아서 어쩌구 저쩌구</span> : null} 
            {/* <DistrictChart /> */}
            {/* <SeoulUsageChart /> */}
        </>
    )
}

export default SeoulDistrictsGraph;