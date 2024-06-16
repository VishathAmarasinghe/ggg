
import sendEmail from "./EmailSender.js";

export const bulkEmailSender = async (emailsArray,subject,description) => {
  try {
    
   
    const sendResults = [];

    for (const email of emailsArray) {
      console.log("email   ",email);
      try {
        const sendResult = await sendEmail(email, subject, description);
        if (sendResult!=1) {
            sendResults.push({ email: email, success: false, error: error.message });
        }else{
            sendResults.push({ email: email, success: true, error: null });
        }
        
      } catch (error) {
        console.log("Error sending email to", user?.email, ":", error);
        sendResults.push({ email:email, success: false, error: error.message });
      }
    }

    return sendResults; 
  } catch (error) {
    console.log("Error:", error);
    return []; 
  }
};
