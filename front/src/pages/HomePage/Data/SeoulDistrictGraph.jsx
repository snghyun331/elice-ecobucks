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
        // ID에 따라 다른 동작을 수행할 수 있습니다.
        switch (id) {
            case "Dobong-gu":
                setIdx("도봉구");
                break;
            case "Dongdaemun-gu":
                setIdx("동대문구");
                break;
            case "Dongjak-gu":
                setIdx("동작구");
                break;
            case "Eunpyeong-gu":
                setIdx("은평구");
                break;
            case "Gangbuk-gu":
                setIdx("강북구");
                break;
            case "Gangdong-gu":
                setIdx("강동구");
                break;
            case "Gangseo-gu":
                setIdx("강서구");
                break;
            case "Geumcheon-gu":
                setIdx("금천구");
                break;
            case "Guro-gu":
                setIdx("구로구");
                break;
            case "Gwanak-gu":
                setIdx("관악구");
                break;
            case "Gwangjin-gu":
                setIdx("광진구");
                break;
            case "Gangnam-gu":
                setIdx("강남구");
                break;
            case "Jongno-gu":
                setIdx("종로구");
                break;
            case "Jung-gu":
                setIdx("중구");
                break;
            case "Jungnang-gu":
                setIdx("중랑구");
                break;
            case "Mapo-gu":
                setIdx("마포구");
                break;
            case "Nowon-gu":
                setIdx("노원구");
                break;
            case "Seocho-gu":
                setIdx("서초구");
                break;
            case "Seodaemun-gu":
                setIdx("서대문구");
                break;
            case "Seongbuk-gu":
                setIdx("성북구");
                break;
            case "Seongdong-gu":
                setIdx("성동구");
                break;
            case "Songpa-gu":
                setIdx("송파구");
                break;
            case "Yangcheon-gu":
                setIdx("양천구");
                break;
            case "Yeongdeungpo-gu":
                setIdx("영등포구");
                break;
            case "Yongsan-gu":
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

            {idx === 0 ? <SeoulUsageChart /> : <DistrictChart idx={idx} />}
            {idx === "서초구" ?
                <span>
                    <h5>서초구</h5>
                    최근 5년간 서초구의 전력 사용량은 지속적으로 증가하고 있습니다.<br />
                    에너지 절약 및 효율적인 에너지 관리에 주의를 기울이는 것이 중요합니다.<br />
                    서초구 주민 및 기업체들은 이러한 문제에 대해 인식하고 협력하여<br />
                    지속가능한 에너지 소비 문화를 만들어 나가는데 기여해주시기 바랍니다.
                </span>
                : null
            }
            {idx === "강남구" ?
                <span>
                    <h5>강남구</h5>
                    주의하세요. 강남구는 최근 5년간 전력 사용량이 지속적으로 증가하고 있습니다.<br />
                    에너지 절약 및 효율적인 에너지 관리에 노력을 기울이는 것이 필요합니다.</span>
                : null
            }
            {idx === "송파구" ?
                <span>
                    <h5>송파구</h5>
                    전력 사용량에 주의하세요. 송파구에서는 최근 5년 동안 전력 사용량이 증가하고 있는 경향이 있습니다.<br />
                    에너지 절약 및 환경 친화적인 전력 소비 습관을 갖도록 노력해야 합니다.
                </span>
                : null
            }
            {idx === "양천구" ?
                <span>
                    <h5>양천구</h5>
                    전력 사용량 조심하세요. 양천구에서는 최근 5년 동안 전력 소비가 증가하고 있습니다.<br />
                    에너지 절약 및 신재생 에너지 도입 등의 노력이 필요합니다.
                </span>
                : null
            }
            {idx === "성동구" ?
                <span>
                    <h5>성동구</h5>
                    주의하세요. 성동구는 최근 5년간 전력 사용량이 계속해서 증가하고 있습니다.<br />
                    지속 가능한 에너지 관리를 위해 전력 소비 패턴을 개선하고, 에너지 절약에 노력하는 것이 중요합니다.
                </span>
                : null
            }
            {idx === "용산구" ?
                <span>
                    <h5>용산구</h5>전력 사용량에 주의하세요. 용산구에서는 최근 5년 동안 전력 소비가 계속해서 증가하고 있습니다.<br />
                    지속 가능한 에너지 소비를 위해 에너지 절약 및 대안적인 에너지 소스 도입에 주의해야 합니다.
                </span>
                : null
            }
            {idx === "노원구" ?
                <span>
                    <h5>노원구</h5>
                    주의하세요. 노원구에서는 최근 5년간 전력 사용량이 상당히 증가하고 있습니다.<br />
                    에너지 절약을 위해 전기 기기 사용 패턴을 검토하고, 에너지 효율을 개선하는 방법을 고려해야 합니다.
                </span>
                : null
            }
        </>
    )
}

export default SeoulDistrictsGraph;