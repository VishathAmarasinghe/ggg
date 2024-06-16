import express from "express";
import { getAllNotifications } from "../Controllers/NotificationController.js";


const route=express.Router();


route.get("/",getAllNotifications);



export default route;