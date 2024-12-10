require('dotenv').config();

const config = {
    email:{
        host:process.env.EMAIL_HOST || 'smtp.example.com',
        port:process.env.EMAIL_PORT || 587,
        user:process.env.EMAIL_USER || 'default@example.com',
        pass:process.env.EMAIL_PASS || 'defaultpassword',
    }
}

module.exports = config;