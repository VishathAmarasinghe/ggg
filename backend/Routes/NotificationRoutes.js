import express from "express";
import { addNotifications} from "../Controllers/NotificationController.js";

const route=express.Router();


route.post("/notifi",addNotifications);



export default route;