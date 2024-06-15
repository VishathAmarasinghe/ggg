import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = 5020;

const db = mysql.createPool({
    connectionLimit: 100,
    host: "sid-sql.mysql.database.azure.com",
    user: "Master01",
    password: "Password123!",
    database: "sid",
    port: 3306,
    ssl: {
        rejectUnauthorized: false
      },
      connectTimeout: 10000
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

    // Extract temperatures and convert them to numbers
    const temperatures = sensors.map(sensor => parseFloat(sensor.data_value.replace("C", "")));

    // Calculate the average temperature
    const averageTemperature = calculateAverage(temperatures);

    // Determine fan speed based on the average temperature
    const fanSpeed = determineFanSpeed(averageTemperature);

    // Insert each sensor data into the database
    const insertSensorData = "INSERT INTO sensorsdata (SENSOR_ID, DATE, TIME, VALUE) VALUES (?, ?, ?, ?)";

    sensors.forEach(sensor => {
        const sensorId = sensor.sensor_id;
        const dateTime = new Date(); // Assuming current date and time
        const date = dateTime.toISOString().split('T')[0]; // YYYY-MM-DD format
        const time = dateTime.toTimeString().split(' ')[0]; // HH:MM:SS format
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

    // Send email if fanSpeed is "High" or "OFF"
    if (fanSpeed === "High" || fanSpeed === "OFF") {
        sendEmail(fanSpeed, averageTemperature);
    }
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

app.get('/sensor_data', (req, res) => {
    const sensorDataQuery = "SELECT * FROM sensorsdata";
    db.query(sensorDataQuery, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        const chartData = {};
        const temperatures = [];

        data.forEach(row => {
            const { SENSOR_ID, TIME, VALUE } = row;

            if (!chartData[SENSOR_ID]) {
                chartData[SENSOR_ID] = [];
            }

            chartData[SENSOR_ID].push({ [TIME]: VALUE });
            temperatures.push(VALUE);
        });

        const avTemp = calculateAverage(temperatures);
        const fanSpeed = determineFanSpeed(avTemp);
        const coolTemp = fanSpeed === "High" ? "cooling" : "normal";

        res.status(200).json({
            chartData,
            avTemp,
            coolTemp,
            fan_speed: fanSpeed === "High" ? 230 : fanSpeed === "medium" ? 200 : fanSpeed === "low" ? 150 : 0
        });
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
    } else if (averageTemperature >= 15 && averageTemperature <= 25) {
        return "low";
    } else if (averageTemperature >= 25 && averageTemperature <= 35) {
        return "medium";
    } else {
        return "High";
    }
}

function sendEmail(fanSpeed, averageTemperature) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pasinduj27@gmail.com', // replace with your email
            pass: 'bjoy rgka sner cnjt'   // replace with your email password or app-specific password
        }
    });

    const mailOptions = {
        from: 'pasinduj27@gmail.com', // replace with your email
        to: 'charith20anupama@gmail.com',
        subject:` Fan Status Alert: ${fanSpeed}`,
        text: 'The fan speed is set to ${fanSpeed} due to ${fanSpeed === "High" ? "high" : "low"} temperature. The average temperature is ${averageTemperature}C.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

export default app;