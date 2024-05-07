import  express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import SensorRoute from './Routes/SensorRoutes.js';


const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const PORT=5020;


app.use("/sensor",SensorRoute);



app.listen(PORT,()=>{
    console.log("Application is running on server 5020");
})