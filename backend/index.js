import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = 5020;

const db = mysql.createPool({ 
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "new_sid",
});

app.listen(PORT, () => {
    console.log("Application is running on server 5020");
});

app.get('/', (req, res) => {
    res.json('hi this came from back end');
});

app.post("/sensor_data", (req, res) => {
    const sensors = req.body.sensors;

    if (!sensors || !Array.isArray(sensors)) {
        return res.status(400).json({ message: "Invalid sensor data" });
    }

    const temperatures = sensors.map(sensor => parseFloat(sensor.data_value.replace("C", "")));

    const averageTemperature = calculateAverage(temperatures);

    const fanSpeed = determineFanSpeed(averageTemperature);

    const insertSensorData = "INSERT INTO sensors_data (SENSOR_ID, DATE, TIME, VALUE) VALUES (?, ?, ?, ?)";
    
    sensors.forEach(sensor => {
        const sensorId = sensor.sensor_id;
        const dateTime = new Date();
        const date = dateTime.toISOString().split('T')[0];
        const time = dateTime.toTimeString().split(' ')[0];
        const value = parseFloat(sensor.data_value.replace("C", ""));

        db.query(insertSensorData, [sensorId, date, time, value], (err, result) => {
            if (err) {
                console.error("Error inserting data: ", err);
            } else {
                console.log("Data inserted successfully");
            }
        });
    });

    res.status(200).json({ averageTemperature, fanSpeed });
});

app.get('/users', (req, res) => {
    const userQ = "SELECT * FROM users";
    db.query(userQ, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

function determineFanSpeed(averageTemperature) {
    if (averageTemperature < 15) {
        return "OFF";
        //mail trigger
    } else if (averageTemperature >= 15 && averageTemperature <= 25) {
        return "low";
    }else if (averageTemperature >= 25 && averageTemperature <= 35) {
        return "medium";    
    } else {
        return "High";
        //mail trigger
    }
}

export default app;