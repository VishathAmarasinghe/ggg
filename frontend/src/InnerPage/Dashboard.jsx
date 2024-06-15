import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [SingleSensorData,setSingleSensorData]=useState([]);

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:5020');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const newSensorData = JSON.parse(message.data);
      setSingleSensorData(newSensorData);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  },[])


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

        </div>
        </div>
  )
}

export default Dashboard