import express from "express";
import { getPastDataBySensorAndByDate } from "../Controllers/PastData.js";
const route=express.Router();



route.get("/pastData",getPastDataBySensorAndByDate);


export default route;