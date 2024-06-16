import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureVsTimeChart = ({ data, setLastValue, setLastDate }) => {
  if (!data) {
    return <p>No data available</p>;
  }

  const labels = data.map(item => Object.keys(item)[0]);
  const temperatures = data.map(item => parseFloat(Object.values(item)[0]));

  useEffect(() => {
    if (labels.length > 0) {
      const lastLabel = labels[labels.length - 1];
      const lastTemperature = temperatures[temperatures.length - 1];
      const [date] = lastLabel.split(' ');
      setLastValue(lastTemperature);
      setLastDate(date);
    }
  }, [labels, temperatures, setLastValue, setLastDate]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
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
          stepSize: 10,
        },
        min: 10,
        max: 120,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TemperatureVsTimeChart;
