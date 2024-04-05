import React from "react";
import {

  AppstoreOutlined,
  LineChartOutlined,
  ProfileOutlined,

} from "@ant-design/icons";


function getItem(label, key, icon, children) {
  return {
    key,
    icon: icon,
    children,
    label
  };
}

const leftItems = [
  getItem("Dashboard", "1", <AppstoreOutlined/>),
  getItem("Past Data", "2", <LineChartOutlined />),
  getItem("Notifications", "3", <ProfileOutlined />)
  
];


const UserRelatedNavigationPanel=()=>{
  return leftItems;
}



export {UserRelatedNavigationPanel};
