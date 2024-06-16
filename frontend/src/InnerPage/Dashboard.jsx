
import React, { useEffect, useState } from 'react'

import SensordCards from '../Components/SensordCards'
import { message, notification } from 'antd';
import { getTriggeredTemparatures } from '../API';


const Dashboard = () => {
  const [SingleSensorData,setSingleSensorData]=useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:5020');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const newSensorData = JSON.parse(message.data);
      console.log("new Sensor Data is ",newSensorData);
      if (newSensorData?.message!='keep-alive' && newSensorData?.message!="Welcome to the WebSocket server" ) {
        setSingleSensorData(newSensorData);
        if (newSensorData?.notificationMsg!="") {
          notification.warning({message:"Critical Alart",description:newSensorData?.notificationMsg})
        }
      }
      
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  },[])


  const fetchData=async()=>{
    try {
      const fetchData=await getTriggeredTemparatures();
      console.log("fetch data ",fetchData);
      setSingleSensorData(fetchData.data);
    } catch (error) {
      message.error("Data fetching error!");
    }
  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Dashboard
        </h1>
      </div>

      <div
        className="w-[95%] bg-white  h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 "
      >

       <SensordCards sensorData={SingleSensorData}/>

        </div>
        </div>
  )
}

export default Dashboard