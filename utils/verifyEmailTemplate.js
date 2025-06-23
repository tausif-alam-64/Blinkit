const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>Dear ${name} </p>
    <p>Thank you for registering to Blinkit web.</p>
    <a href=${url} style= "color : white; background : blue: margin-top : 10px ">
     Verify Email
    </a> 
    `
}

export default verifyEmailTemplate;