import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureVsTimeChart = () => {
  const data = {
    labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'], 
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [22, 23, 25, 26, 27, 26, 24], 
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, 
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureVsTimeChart;