import  express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import SensorRoute from './Routes/SensorRoutes.js';
import mysql from 'mysql2';
import { config } from "./Config/SqlConnection.js";


const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const PORT=5020;



var connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});


app.use("/sensor",SensorRoute);



app.listen(PORT,()=>{
    console.log("Application is running on server 5020");
})