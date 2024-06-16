import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { getAllNotifications } from '../API';
import dayjs from 'dayjs';

const PastNotifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);


  //fetch notifications
  const fetchNotifications = async () => {
    try {
      const notificationResult = await getAllNotifications();
      console.log("Notification information ", notificationResult);
      setData(notificationResult.data);
    } catch (error) {
      message.error("Error fetching notifications!");
    } finally {
      setLoading(false);
    }
  };


  //table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Time',
      dataIndex: 'TIME',
      key: 'TIME',
    },
    {
      title: 'Date',
      dataIndex: 'DATE',
      key: 'DATE',
      render: (text) => dayjs(text).format("YYYY-MM-DD")
    },
    {
      title: 'Status',
      dataIndex: 'STATUS',
      key: 'STATUS',
    },
  ];

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Notifications
        </h1>
      </div>

      <div className="w-[95%] bg-white h-[90%] flex flex-col lg:flex-col pt-4 rounded-xl p-1">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="ID"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default PastNotifications;
