const forgotPasswordTemplate = ({name, otp}) => {
   return `
   <div>
        <p>Dear, ${name} </p>
        <p>you're requested a password reset. Please use following OTP code to reset your password.</p>
        <div style="background:yellow; font-size:20px">${otp}</div>
        <p>This otp is valid for 1 hour only. Enter this otp in the blinkit website to procced with reseting your password.</p>
        <br/>
        <p>Thanks</p>
        <p>Blinkit.</p>
        
   `
}
export default forgotPasswordTemplate;