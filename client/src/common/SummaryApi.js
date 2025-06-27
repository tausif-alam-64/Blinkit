export const baseURL = "http://localhost:8080"

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post'
    },
    login:{
        url: '/api/user/login',
        method: 'post'
    },
    forgot_password:{
        url: '/api/user/forgot-password',
        method: 'put'
    },
    forgot_password_otp_varification : {
        url: '/api/user/verify-forgot-password-otp',
        method: 'put'
    }
}

export default SummaryApi;