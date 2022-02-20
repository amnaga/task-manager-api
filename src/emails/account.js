const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'m.nagarajanbtech@gmail.com',
        subject:'Thanks for joining in',
        text:`Welcome to this application, $(name) Let me know how get along with the app`
    })
    
}

module.exports = {
    sendWelcomeEmail
}