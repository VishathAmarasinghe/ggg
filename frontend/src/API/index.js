import axios from "axios";


const API=axios.create({
    baseURL:"http://localhost:5020/"
  })
  
  
//   API.interceptors.request.use((req)=>{
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
//     }
//     return req;
//   })
  
  
  
  export const getTriggeredTemparatures=()=>API.get("/sensor/temparatures");
  export const getAllNotifications=()=>API.get("/notification");


  export const getPastSensorData=(date,id)=>API.get(`/pastInfo/pastData?sensorID=${id}&date=${date}`);