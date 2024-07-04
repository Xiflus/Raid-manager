import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_APIKEY } from "../../env.js";
import { sendEmailError } from "../services/errorService.js";

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_APIKEY,
  },
});

const sendMailUtil = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    sendEmailError();
  }
};

export default sendMailUtil;
