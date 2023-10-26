const nodemailer = require('nodemailer');

const sendVerificationOTP = async (to, otp) => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    await transport.sendMail({
        from: `AiroMap<${process.env.MAIL_USERNAME}>`,
        to: to,
        subject: "Email Verification OTP for AiroMap",
        html: `<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <div style="background-color: #f4f4f4; padding: 10px;">
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background-color: #fff; padding: 20px; text-align: center; border-radius: 15px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #444; font-size: 24px;">Welcome to AiroMap 🌬️!</h2>
                    <p style="font-size: 16px; color: #666;">
                        To complete your registration, please verify your email address by entering the following OTP:
                    </p>
                    <div style="font-size: 24px; color: #444; padding: 20px; border-radius: 5px; background-color: #f9f9f9; display: inline-block;">
                        ${otp}
                    </div>
                    <p style="font-size: 16px; color: #666;">
                        If you did not request this code, you can safely ignore this email.
                    </p>
                    <p style="font-size: 16px; color: #666;">
                        Thanks,<br>AiroMap Team
                    </p>
                </div>
            </div>
        </div>
    </body>`
    });
}

module.exports = sendVerificationOTP;
