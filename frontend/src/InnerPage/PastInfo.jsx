import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Table, message } from 'antd';
import 'antd/dist/reset.css'; 
import dayjs from 'dayjs';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getPastSensorData } from '../API';

const { Option } = Select;

const PastInfo = () => {
  const [selectedSensor, setSelectedSensor] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);


  //handle changing of sensor
  const handleChange = (value) => {
    setSelectedSensor(value);
  };


  //handleCange date
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };


  //get past data
  const handleChangePastData = async () => {
    try {
      const result = await getPastSensorData(selectedDate, selectedSensor);
      const formattedData = result?.data.map(entry => ({
        ...entry,
        date: dayjs(entry.DATE).format('YYYY-MM-DD'),
        value: parseFloat(entry.VALUE),
        TIME: entry.TIME,
        SENSOR_ID: entry.SENSOR_ID,
      }));
      setData(formattedData);
      setChartData(formattedData);
    } catch (error) {
      message.error('Past data fetching error!');
    }
  };

  useEffect(() => {
    handleChangePastData();
  }, [selectedDate, selectedSensor]);

  const columns = [
    {
      title: 'Sensor ID',
      dataIndex: 'SENSOR_ID',
      key: 'SENSOR_ID',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'TIME',
      key: 'TIME',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center shadow-2xl overflow-y-auto p-4 bg-white rounded-lg">
      <div className="w-full mb-4">
        <h1 className="font-inter font-semibold text-2xl ml-8 my-2 text-gray-600">
          Past Data
        </h1>
      </div>

      <div className="w-full flex flex-col items-center rounded-xl p-4 border border-gray-200 bg-green-50">
        <div className="w-full flex justify-between items-center mb-4">
          <Select
            defaultValue="Select a Sensor"
            style={{ width: 200, fontSize: '16px', height: '32px', padding: '0 10px' }}
            onChange={handleChange}
            className="shadow-md rounded"
          >
            <Option value="1">Sensor 1</Option>
            <Option value="2">Sensor 2</Option>
            <Option value="3">Sensor 3</Option>
            <Option value="4">Sensor 4</Option>
          </Select>
          <DatePicker
            onChange={handleDateChange}
            style={{ marginLeft: '20px' }}
            className="shadow-md rounded"
            defaultValue={dayjs(selectedDate)}
          />
        </div>

        <div className="w-full mb-8 flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="TIME" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#318C10" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Table
          columns={columns}
          dataSource={Array.isArray(data) ? data : []}
          pagination={{ pageSize: 5 }}
          className="w-full shadow-md rounded"
        />
      </div>
    </div>
  );
};

export default PastInfo;
