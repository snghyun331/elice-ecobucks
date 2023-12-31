import { useEffect, useState, useRef } from 'react';
import { ResponsiveLine } from '@nivo/line';
import * as Api from "../../../api";

//구별 월평균 데이터
const DistrictChart = (idx) => {
    const isFirstMount = useRef(true);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get('data/districtUsage');
            
                // 도시 이름으로 나누기
                const dataByCity = {};
                response.data.forEach(item => {
                    const cityName = item.city;
                    if (!dataByCity.hasOwnProperty(cityName)) {
                        dataByCity[cityName] = [];
                    }
                    dataByCity[cityName].push(item);
                });
                const cityData = Object.values(dataByCity);
                setChartData(cityData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // 데이터를 가져오는 비동기 함수 (예: API 호출)를 이곳에서 실행하고,
        // 가져온 데이터를 setChartData를 통해 상태로 설정합니다.
        fetchData();
    }, []);
    useEffect(() => {
        if (!isLoading) {
          calculateAvgPowerUsage();
        }
      }, [isLoading]);

    const calculateAvgPowerUsage = () => {
        const avgPowerUsageByCity = [];

        chartData.forEach(cityData => {
            const { city } = cityData[0];

            const monthlyAvgs = {};

            cityData.forEach(data => {
                const { month, powerUsage } = data;

                if (!monthlyAvgs.hasOwnProperty(month)) {
                    monthlyAvgs[month] = {
                        totalPowerUsage: 0,
                        count: 0
                    };
                }

                monthlyAvgs[month].totalPowerUsage += powerUsage;
                monthlyAvgs[month].count++;
            });

            const monthlyAvgsArray = Object.entries(monthlyAvgs).map(([month, { totalPowerUsage, count }]) => ({
                month,
                avgPowerUsage: totalPowerUsage / count
            }));

            avgPowerUsageByCity.push({
                city,
                monthlyAvgs: monthlyAvgsArray
            });
        });

        const transformedData = avgPowerUsageByCity.map(item => {
            const monthlyAvgs = item.monthlyAvgs.map(monthlyData => ({
              x: monthlyData.month,
              y: monthlyData.avgPowerUsage
            }));
        
            return {
              id: item.city,
              data: monthlyAvgs
            };
          });
        
          return transformedData;
    }

    const transformedData = calculateAvgPowerUsage()

      const dynamicData = [];

      for (let i = 0; i < transformedData.length; i++) {
        const currentObject = transformedData[i];
        if (currentObject.id === idx.idx) {
          dynamicData.push(currentObject);
        }
      }
    
    if (isFirstMount.current) {
        isFirstMount.current = false;
    } 

    return (
        <div style={{ width: 500, height: 450, marginLeft: "20px" }}>
            <ResponsiveLine
                data={dynamicData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 150, max: 420, stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Power Usage',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 150,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default DistrictChart;