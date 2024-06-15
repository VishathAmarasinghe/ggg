

// import React from 'react';
// import { Select, DatePicker, Table } from 'antd';
// import 'antd/dist/reset.css'; // Import Ant Design styles
// import dayjs from 'dayjs';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// const { Option } = Select;

// const PastInfo = () => {
//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//   };

//   const columns = [
//     {
//       title: 'Sensor ID',
//       dataIndex: 'sensorID',
//       key: 'sensorID',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Time',
//       dataIndex: 'time',
//       key: 'time',
//     },
//     {
//       title: 'Value',
//       dataIndex: 'value',
//       key: 'value',
//     },
//   ];

//   const data = [
//     { sensorID: 'S01', date: dayjs('2024-01-01').format('YYYY-MM-DD'), time: "22:00", value: 10 },
//     { sensorID: 'S02', date: dayjs('2024-01-02').format('YYYY-MM-DD'), time: "21:00", value: 20 },
//     { sensorID: 'S03', date: dayjs('2024-01-03').format('YYYY-MM-DD'), time: "20:00", value: 30 },
//     { sensorID: 'S04', date: dayjs('2024-01-04').format('YYYY-MM-DD'), time: "19:00", value: 25 },
//     { sensorID: 'S05', date: dayjs('2024-01-05').format('YYYY-MM-DD'), time: "18:00", value: 35 },
//     { sensorID: 'S01', date: dayjs('2024-01-06').format('YYYY-MM-DD'), time: "17:00", value: 45 },
//     // Add more data as needed
//   ];

//   const sensors = ['S01', 'S02', 'S03', 'S04', 'S05'];
//   const chartData = data.reduce((acc, curr) => {
//     const existingEntry = acc.find(entry => entry.date === curr.date);
//     if (existingEntry) {
//       existingEntry[curr.sensorID] = curr.value;
//     } else {
//       acc.push({ date: curr.date, [curr.sensorID]: curr.value });
//     }
//     return acc;
//   }, []);

//   return (
//     <div className="w-full h-full flex flex-col items-center shadow-2xl overflow-y-auto p-4 bg-white rounded-lg">
//       <div className="w-full mb-4">
//         <h1 className="font-inter font-semibold text-2xl ml-8 my-2 text-gray-600">
//           Past Data
//         </h1>
//       </div>

//       <div className="w-full mb-8 flex justify-center">
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             width={500}
//             height={300}
//             data={chartData}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {sensors.map(sensor => (
//               <Line key={sensor} type="monotone" dataKey={sensor} stroke="#8884d8" />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="w-full flex flex-col items-center rounded-xl p-4 border border-gray-200 bg-green-50">
//         <div className="w-full flex justify-between items-center mb-4">
//           <Select
//             defaultValue="Select a Sensor"
//             style={{ width: 200, fontSize: '16px', height: '40px', padding: '0 10px' }}
//             onChange={handleChange}
//             className="shadow-md rounded"
//           >
//             <Option value="sensor1">Sensor 1</Option>
//             <Option value="sensor2">Sensor 2</Option>
//             <Option value="sensor3">Sensor 3</Option>
//             <Option value="sensor4">Sensor 4</Option>
//             <Option value="sensor5">Sensor 5</Option>
//           </Select>
//           <DatePicker style={{ marginLeft: '20px' }} className="shadow-md rounded" />
//         </div>

//         <Table
//           columns={columns}
//           dataSource={data}
//           pagination={{ pageSize: 5 }}
//           className="w-full shadow-md rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default PastInfo;


import React from 'react';
import { Select, DatePicker, Table } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import dayjs from 'dayjs';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const { Option } = Select;

const PastInfo = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      title: 'Sensor ID',
      dataIndex: 'sensorID',
      key: 'sensorID',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const data = [
    { sensorID: 'S01', date: dayjs('2024-01-01').format('YYYY-MM-DD'), time: "22:00", value: 10 },
    { sensorID: 'S02', date: dayjs('2024-01-02').format('YYYY-MM-DD'), time: "21:00", value: 20 },
    { sensorID: 'S03', date: dayjs('2024-01-03').format('YYYY-MM-DD'), time: "20:00", value: 30 },
    { sensorID: 'S04', date: dayjs('2024-01-04').format('YYYY-MM-DD'), time: "19:00", value: 25 },
    { sensorID: 'S05', date: dayjs('2024-01-05').format('YYYY-MM-DD'), time: "18:00", value: 35 },
    { sensorID: 'S01', date: dayjs('2024-01-06').format('YYYY-MM-DD'), time: "17:00", value: 45 },
    // Add more data as needed
  ];

  const sensors = ['S01', 'S02', 'S03', 'S04', 'S05'];
  const chartData = data.reduce((acc, curr) => {
    const existingEntry = acc.find(entry => entry.date === curr.date);
    if (existingEntry) {
      existingEntry[curr.sensorID] = curr.value;
    } else {
      acc.push({ date: curr.date, [curr.sensorID]: curr.value });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center shadow-2xl overflow-y-auto p-4 bg-white rounded-lg">
      <div className="w-full mb-4">
        <h1 className="font-inter font-semibold text-2xl ml-8 my-2 text-gray-600">
          Past Data
        </h1>
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
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {sensors.map(sensor => (
              <Line key={sensor} type="monotone" dataKey={sensor} stroke="#8884d8" />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full flex flex-col items-center rounded-xl p-4 border border-gray-200 bg-green-50">
        <div className="w-full flex justify-between items-center mb-4">
          <Select
            defaultValue="Select a Sensor"
            style={{ width: 200, fontSize: '16px', height: '32px', padding: '0 10px' }} // Adjust height to decrease size
            onChange={handleChange}
            className="shadow-md rounded"
          >
            <Option value="sensor1">Sensor 1</Option>
            <Option value="sensor2">Sensor 2</Option>
            <Option value="sensor3">Sensor 3</Option>
            <Option value="sensor4">Sensor 4</Option>
            <Option value="sensor5">Sensor 5</Option>
          </Select>
          <DatePicker style={{ marginLeft: '20px' }} className="shadow-md rounded" />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="w-full shadow-md rounded"
        />
      </div>
    </div>
  );
};

export default PastInfo;
