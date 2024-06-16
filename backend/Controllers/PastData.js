import { getPastDataByDateAndID } from "../SQLQueries/SensorDataQueries.js";

export const getPastDataBySensorAndByDate= async (req, res) => {
    try {
        const {sensorID,date}=req.query;
        console.log("sensor id ",sensorID,"  date ",date);
      const pastData=await getPastDataByDateAndID(date,sensorID);
      console.log("incmoong past data is ",pastData);
      return res.status(200).json(pastData);
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  