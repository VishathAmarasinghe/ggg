import React, { useEffect, useState } from "react";
import Dashboard from "../InnerPage/Dashboard";
import PastInfo from "../InnerPage/PastInfo";
import PastNotifications from "../InnerPage/PastNotifications";





const pageChanger = (pageChanger) => {
  const user=JSON.parse(localStorage.getItem("profile"));
  console.log("aasa ", pageChanger);
  switch (pageChanger) {
    case "1":
      return <Dashboard/>
      
    case "2":
      return <PastInfo/>

    case "3":
      return<PastNotifications/>
    default:
      break;
  }
};

const InnerPageLoader = ({ innerPageKey }) => {
  const [renderingPage,SetRenderingPage]=useState(<></>);
  useEffect(()=>{
      SetRenderingPage(pageChanger(innerPageKey));
  },[innerPageKey])
  return <>{renderingPage}</>;

};

export default InnerPageLoader;



