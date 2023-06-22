import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const SeasonalUsageGraph = () => {
    const data = {
        labels: ['봄', '여름', '가을', '겨울'],
        datasets: [
          {
            data: [209.5405111111111, 264.67591999999996, 228.58072, 236.75116666666668],
            backgroundColor: ['#36eb85', 'red', '#FFCE56', '#e8994e'],
            hoverBackgroundColor: ['#2fd677','#c40831', '#FFCE56', '#c98442'],
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '도넛 차트',
        },
      };

    return (
    <div style={{ marginTop: "40px", width: '100%', height: '300px' }}>
        <Doughnut data={data} options={options} />
    </div>
    );
}

export default SeasonalUsageGraph;