import SensorCard from "./SensorCard";
import TemperatureVsTimeChart from "./TemperatureVsTimeChart";

const SensordCards = ({sensorData}) => {
  console.log("incomming sensor dat ",sensorData);
  return (
    <div className="w-full border-2 border-red-600">
      <div className="w-full flex justify-center">
        <div className="flex box-context w-10/12 h-20 m-2 rounded-lg border-2 border-green-700 bg-green-100">
          <div className="w-96 border-r-2 border-green-700">Average Temparature {sensorData?.averageTemperature}</div>
          <div className="w-96 border-r-2 border-green-700">Cooling/Heating {sensorData?.coolTemp}</div>
          <div className="w-96">fan Speed {sensorData?.fanSpeed}</div>
        </div>
      </div>

      <div className="border-2 border-red-500 flex justify-around mt-2">
        <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"1"}/>
        <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"2"}/>
        <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"3"}/>
        <SensorCard sensorData={sensorData?.finalArray?.chartData} sensor={"4"}/>
        
      </div>
    </div>
  );
};

export default SensordCards;
