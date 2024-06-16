import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureVsTimeChart = () => {
  const data = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'], // More labels for a longer x-axis
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [ 26, 27, 26, 24, 64, 80, 40], // Adjust data points as needed
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
          stepSize: 2,
          min: 0,
          max: 100, // Adjust if you want a wider range
        },
      },
    },
    maintainAspectRatio: false, // This allows the chart to fill the container
  };

  return <div className="chart-container"><Line data={data} options={options} /></div>;
};

export default TemperatureVsTimeChart;