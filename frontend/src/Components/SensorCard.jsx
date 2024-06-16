import React from 'react';
import TemperatureVsTimeChart from './TemperatureVsTimeChart';

const SensorCard = ({ sensorData, sensor }) => {
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
    <div className="flex flex-col p-2 my-auto justify-center items-center box-context w-64 h-[28rem] bg-[#bcedcb] shadow-lg rounded-lg">
      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
        <div className="flex justify-center mt-1">
          <p className="sensorText">Sensor {sensor}</p>
        </div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div>
          {/* Add any additional sensor-specific data here */}
        </div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div>
          {/* Add any additional sensor-specific data here */}
        </div>
      </div>

      <div className="box-context w-56 h-56 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div>
          <TemperatureVsTimeChart data={specificSensorData} />
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
