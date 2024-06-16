import React, { useState } from 'react';
import TemperatureVsTimeChart from './TemperatureVsTimeChart';

const SensorCard = ({ sensorData, sensor }) => {
  const [lastValue, setLastValue] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const specificSensorData = sensorData ? sensorData[sensor] : null;

  if (!specificSensorData) {
    return (
      <div className="flex flex-col p-2 my-auto justify-center items-center box-context w-64 h-[28rem] bg-[#bcedcb] shadow-lg rounded-lg">
        <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
          <div className="flex justify-center mt-1">
            <p className="sensorText">Sensor {sensor}</p>
          </div>
        </div>
        <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
          <div>
            <p>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex p-2 my-auto justify-center items-center box-context h-52 m-2 bg-[#bcedcb] shadow-lg rounded-lg hover:bg-teal-600">
      <div className='flex flex-col justify-around w-64'>
        <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
          <div className="flex justify-center mt-1">
            <p className="sensorText">Sensor {sensor}</p>
          </div>
        </div>
        <div className='w-64'>
          <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
            <div className='flex flex-col'>
              <p id='lastValue' className='pl-3 pt-1 text-gray-500 font-bold'>Last Temperature:</p>
              <p className='text-end italic font-semibold pr-8'>{lastValue}°C</p>
            </div>
          </div>
          <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
            <div className='flex flex-col'>
              <p id='lastdate' className='pl-3 pt-1 text-gray-500 font-bold'>Last Time: </p>
              <p className='text-end italic font-semibold pr-8'>{lastDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-88'>
        <div className="box-context w-80 h-48 bg-white rounded-lg shadow-green-900 shadow-xl">
          <div>
            <TemperatureVsTimeChart data={specificSensorData} setLastValue={setLastValue} setLastDate={setLastDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
