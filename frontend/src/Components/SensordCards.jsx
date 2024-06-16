import React from 'react';
import SensorCard from './SensorCard';

const SensordCards = ({ sensorData }) => {
  console.log("incoming sensor data ", sensorData);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <div className="flex box-context w-10/12 h-20 mt-4 rounded-lg border-2 border-green-700 bg-green-100">
          <div className="w-96 border-r-2 border-green-700">
            <p className="text-2xl font-semibold pl-1">Average Temperature</p>
            <p className="text-end italic font-bold p-1 text-4xl pr-3">{parseFloat(sensorData?.averageTemperature).toFixed(3)} °C</p>
          </div>
          <div className="w-96 border-r-2 border-green-700">
            <p className="text-2xl font-semibold pl-1">Cooling/Heating</p>
            <p className="text-end italic font-bold p-1 text-4xl pr-3">{sensorData?.coolTemp}</p>
          </div>
          <div className="w-96">
            <p className="text-2xl font-semibold pl-1">Fan Speed</p>
            <p className="text-end italic font-bold text-4xl pr-3">{sensorData?.fanSpeed} rpm</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-around my-2">
          <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"1"} />
          <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"2"} />
        </div>
        <div className="flex justify-around">
          <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"3"} />
          <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"4"} />
        </div>
      </div>
    </div>
  );
};

export default SensordCards;
