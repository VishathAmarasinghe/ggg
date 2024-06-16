
import { getAllNotificationsbyDateTimeDesc } from "../SQLQueries/NotificationQueires.js";
import { getAllEmailsofUsers } from "../SQLQueries/UserQueries.js"
import { bulkEmailSender } from "../Utils/BulkEmailSending.js";

export const handleNotifications=async(fanSpeed,averageTemperature)=>{
    try {
        const emails =await getAllEmailsofUsers();
        const subject=` Fan Status Alert: ${fanSpeed}`
        const text= `The fan speed is set to ${fanSpeed} due to ${fanSpeed === "High" ? "high" : "low"} temperature. The average temperature is ${averageTemperature}C`
        console.log("emails ",emails);
        const emailArray=[]
        for(const email of emails){
            emailArray.push(email?.EMAIL)
        }
        const emailResult=await bulkEmailSender(emailArray,subject,text);


    } catch (error) {
        console.log("error occured ",error);
    }
}



export const getAllNotifications=async(req,res)=>{
    try {
        const notificationDetails=await getAllNotificationsbyDateTimeDesc();
        return res.status(200).json(notificationDetails);

    } catch (error) {
        console.log("error occured ",error);
        return res.status(500).json({error:error});
    }
}