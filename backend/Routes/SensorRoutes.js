import express from "express";
import { getCurrentTemperatures, getSensorValues } from "../Controllers/calculateTemparature.js";

const route=express.Router();


//sensor routes
route.post("/data",getSensorValues);
route.get("/temparatures",getCurrentTemperatures);


export default route;