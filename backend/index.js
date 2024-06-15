import  express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from 'cors';
import SensorRoute from './Routes/SensorRoutes.js';


const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const PORT=5020;


app.use("/sensor",SensorRoute);
app.use(express.json());

const db = mysql.createPool({ 
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "new_sid",
});


app.listen(PORT,()=>{
    console.log("Application is running on server 5020");
})

app.get('/', (req, res) => {
    res.json('hi this came from back end');
  });

app.post("/sensor_data" ,(req, res) => {
    const { sensor_id, date, data_value } = req.body;
    const sql = "INSERT INTO `users` (`userName`,`password`,`role`) VALUES (?,?,?)";
    db.query(sql, [userName, password, role], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Server is not working" });
      } else {
        res.status(200).json({ message: "Server is working " });
      }
    });
  });

  app.get('/users', (req, res) => {
    const userQ = "SELECT * FROM `users`";
    db.query(userQ, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

 