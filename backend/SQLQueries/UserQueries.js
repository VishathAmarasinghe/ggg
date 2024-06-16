import connection from "../Config/SqlConnection.js"



//get all user informations
export const getAllEmailsofUsers=async()=>{
    try {

        const rows=await new Promise((resolve,reject)=>{
            connection.query("SELECT EMAIL FROM users",
            (err,row)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(row)
                }
            })
        })
        return rows;
    } catch (error) {
        throw error;
    }
}