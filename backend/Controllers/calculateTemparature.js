import dayjs from "dayjs";
import {
  addSensorData,
  getAllSensorReadingsBydate,
} from "../SQLQueries/SensorDataQueries.js";
import { broadcastData } from "../WebSocket.js";
import {handleNotifications} from '../Controllers/NotificationController.js'
import { addNewNotification } from "../SQLQueries/NotificationQueires.js";


//get sensor values from postman
export const getSensorValues = async (req, res) => {
  const sensors = req.body.sensors;
  try {
    if (!sensors || !Array.isArray(sensors)) {
      return res.status(400).json({ message: "Invalid sensor data" });
    }

    const temperatures = sensors.map((sensor) =>
      parseFloat(sensor.data_value.replace("C", ""))
    );

    //calculate average temp
    const averageTemperature = calculateAverage(temperatures);
    const fanSpeed = determineFanSpeed(averageTemperature);
    let timeValue="";
    let dayValue="";

    for (const sensor of sensors) {
      const sensorId = sensor.sensor_id;
      const dateTime = sensor?.date;
      const date = dateTime.split(" ")[0];
      const time = dateTime.split(" ")[1];
      dayValue=date;
      timeValue=time;
      const value = parseFloat(sensor.data_value.replace("C", ""));

      //adding temp to db
      const addingResult = await addSensorData(sensorId, date, time, value);
      if (addingResult.affectedRows == 0) {
        return res
          .status(500)
          .json({ error: "Error adding sensor values in database" });
      }
    }
    let notificationMsg="";
     // Send email if fanSpeed is "High" or "OFF"
     if (fanSpeed === "High" || fanSpeed === "OFF") {
        notificationMsg=fanSpeed=="High"?"Fan Speed is high, consuming more power..":"Fan is off"
        //notifications adding to db
        addNewNotification(timeValue,dayValue,fanSpeed);
        //email handling
        handleNotifications(fanSpeed,averageTemperature);

    }
    
    const finalArray = await getAllTemperatureValues();

    //broadcasting with socket
    broadcastData({
      fanSpeed,
      averageTemperature,
      finalArray,
      notificationMsg
    });

    res.status(200).json({ averageTemperature, fanSpeed });

   
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



//get Temp values
const getAllTemperatureValues = async () => {
  try {
    const chartData = {};
    const temperatures = [];
    const result = await getAllSensorReadingsBydate(
      dayjs().format("YYYY-MM-DD")
    );
    result.forEach((row) => {
      const { SENSOR_ID, TIME, VALUE } = row;

      if (!chartData[SENSOR_ID]) {
        chartData[SENSOR_ID] = [];
      }

      chartData[SENSOR_ID].push({ [TIME]: VALUE });
      temperatures.push(VALUE);
    });


    //get Average
    const avTemp = calculateAverage(temperatures);
    const fanSpeed = determineFanSpeed(avTemp);
    const coolTemp = fanSpeed === "High" ? "cooling" : "normal";

    const finalArray = {
      chartData,
      avTemp,
      coolTemp,
      fan_speed:
        fanSpeed === "High"
          ? 230
          : fanSpeed === "medium"
          ? 200
          : fanSpeed === "low"
          ? 150
          : 0,
    };

    // console.log(finalArray);
    return finalArray;

  } catch (error) {
    console.log("error ", error);
    return [];
  }
};



//calculate average
function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  return sum / arr.length;
}



//select the fan speed
function determineFanSpeed(averageTemperature) {
  if (averageTemperature < 15) {
    return "OFF";
  } else if (averageTemperature >= 15 && averageTemperature <= 25) {
    return "low";
  } else if (averageTemperature >= 25 && averageTemperature <= 35) {
    return "medium";
  } else {
    return "High";
  }
}


//get current temp values
export const getCurrentTemperatures = async (req, res) => {
  try {
    const finalArray = await getAllTemperatureValues();
    const fanSpeed = finalArray.fan_speed;

    res.status(200).json({
      fanSpeed,
      averageTemperature: finalArray.avTemp,
      finalArray,
    });

   
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
