import { config } from '../Config/SqlConnection.js';

export const addNotifications = (req, res) => {
    
    console.log("Request body:", req.body);

    const { time,date,status } = req.body;

    // Check if all required fields are present
    if (!time || !date || !status) {
        return res.status(400).json("All fields are required");
    }

    const addData = "INSERT INTO notifications (TIME, DATE, STATUS) VALUES (?, ?, ?)";

    config.query(addData, [time,date,status], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }else{
            return res.status(201).json("data added!");  
        }
    });
}