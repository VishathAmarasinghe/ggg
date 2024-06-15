function Validation(values) {
    let errors = {}; // Renamed error to errors for clarity
  
    
    const username_pattern = /^[A-Za-z0-9_-]{3,30}$/;
    const email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
   
    const phoneNo_pattern = /^\d{10}$/;
  
  
   
  
    if (!values.username) {
        errors.username = "Username required";
    } else if (!username_pattern.test(values.username)) {
        errors.username = "Username should be 3-30 characters and can include letters, numbers, underscores, and dashes";
    }
  
 
  
    if (!values.email) {
        errors.email = "Email required";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email is invalid";
    }
  
    if (!values.phoneNo) {
        errors.phoneNo = "phoneNo number required";
    } else if (!phoneNo_pattern.test(values.phoneNo)) {
        errors.phoneNo = "phoneNo number is invalid";
    }
  
    if (!values.password) {
        errors.password = "Password required";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must contain at least 8 characters, including a letter and a number";
    }
  
    if (!values.cpassword) {
        errors.cpassword = "Confirmation password required";
    } else if (values.cpassword !== values.password) {
        errors.cpassword = "Passwords do not match";
    }
  
    return errors;
  }
  
  
  export default Validation;
  
  
  