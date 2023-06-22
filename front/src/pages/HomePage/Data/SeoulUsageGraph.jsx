import { useEffect, useState } from 'react';
import * as Api from "../../../api";
import { ResponsiveLine } from '@nivo/line';

const SeoulUsageChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get('data/seoulUsage');
                const data = response.data;
                if (data.length > 0) {
                    setChartData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (chartData.length === 0) {
        return null; // 또는 로딩 상태를 표시할 수 있는 JSX를 반환합니다.
    }

    const transformedData = chartData.map(item => ({
        x: item.year,
        y: item.powerUsage
    }));
    // console.log("transformedData: ", transformedData);
    const sortedData = transformedData.sort((a, b) => a.x - b.x);
    // console.log("sortedData: ", sortedData);


    return (
        <div style={{ width: 500, height: 450, marginLeft:"20px" }}>
            <p />
            <ResponsiveLine
                data={[{ id: 'Seoul Usage', data: sortedData }]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 220, max: 250, stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Year',
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
                enablePointLabel={true}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
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

export default SeoulUsageChart;
