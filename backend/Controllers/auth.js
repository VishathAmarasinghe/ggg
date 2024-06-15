
import { config } from '../Config/SqlConnection.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Registration function
export const register = (req, res) => {
    // Debugging: Log the incoming request body to inspect it
    console.log("Request body:", req.body);

    const { username, email, phoneNo, password } = req.body;

    // Check if all required fields are present
    if (!username || !email || !phoneNo || !password) {
        return res.status(400).json("All fields are required: username, email, phone number, password");
    }

    // Query to check if user already exists based on various criteria
    const checkUserQuery = "SELECT * FROM users WHERE USER_NAME = ? OR EMAIL = ? OR PHONE_NUMBER = ?";

    // Values from the request body to check if the user already exists
    const checkValues = [username, email, phoneNo];

    // First, check if the user already exists
    config.query(checkUserQuery, checkValues, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        if (data.length) {
            return res.status(409).json("User already exists with the same username, email or contact number");
        }

        // User does not exist, proceed with registration

        // Generate salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Query to insert a new user
        const insertUserQuery = "INSERT INTO users (USER_NAME, EMAIL, PHONE_NUMBER, PASSWORD) VALUES (?, ?, ?, ?)";

        // Values from the request body to insert the new user
        const insertValues = [username, email, phoneNo, hash];

        // Execute the query to insert the new user
        config.query(insertUserQuery, insertValues, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            return res.status(201).json("User created");
        });
    });
};

export const login = (req, res) => {
    const checkUserQuery = "SELECT * FROM users WHERE USER_NAME = ?";
    
    // Pass the username as an array
    config.query(checkUserQuery, [req.body.username], (err, data) => {
      if (err) {
        console.error(err);
        return res.json(err);
      } 
      if (data.length == 0) {
        return res.status(404).json("User not found");
      }
  
      // Check if the password is correct
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].PASSWORD); 
      if (!isPasswordCorrect) {
        return res.status(401).json("Password incorrect");
      }
  
      // Create token
      const token = jwt.sign({username: data[0].USER_NAME, id: data[0].ID}, "jwtkey");  
      const {PASSWORD, ...otherDetails} = data[0];
      
      res.cookie("access_token", token, {
          httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
    });
  };
  

export const logout= (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
  .status(200)
  .json("User logged out successfully");
};  