import connection from "../Config/SqlConnection.js"

export const addSensorData=async(sensorId, date, time, value)=>{
    try {

        const rows=await new Promise((resolve,reject)=>{
            connection.query("INSERT INTO `sensors data`(SENSOR_ID, DATE, TIME, VALUE) VALUES (?, ?, ?, ?)",
            [sensorId, date, time, value],
            (err,row)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(row)
                }
            })
        })
        console.log("rows ",rows);
        return rows;
    } catch (error) {
        throw error;
    }
}


export const getAllSensorReadingsBydate=async(date)=>{
    try {

        const rows=await new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM `sensors data` where DATE=?",
            [date],
            (err,row)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(row)
                }
            })
        })
        // console.log("rows ",rows);
        return rows;
    } catch (error) {
        throw error;
    }
}



export const getPastDataByDateAndID=async(date,ID)=>{
    try {

        const rows=await new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM `sensors data` where DATE=? AND SENSOR_ID=?",
            [date,ID],
            (err,row)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(row)
                }
            })
        })
        console.log("rows ",rows);
        return rows;
    } catch (error) {
        throw error;
    }
}