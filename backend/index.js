import  express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import SensorRoute from './Routes/SensorRoutes.js';
import NotificationRoute from './Routes/NotificationRoutes.js';

import connection from "./Config/SqlConnection.js";
import { createWebSocketServer } from "./WebSocket.js";
import http from 'http';


const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());


const server = http.createServer(app);

createWebSocketServer(server);

const PORT=5020;





connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});


app.use("/sensor",SensorRoute);
app.use('/notification', NotificationRoute);




server.listen(PORT,()=>{
    console.log("Application is running on server 5020");
})