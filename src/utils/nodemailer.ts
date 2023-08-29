import nodemailer = require("nodemailer");

interface IResponse {
  error?: string;
  sent?: boolean;
}

export const sendEmail = async (
  {
    to,
    subject,
    html,
  }: {
    to: string,
    subject: string,
    html: string,
  }
): Promise<IResponse> => {
  let sent: boolean = false;
  let error: string | undefined = undefined;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    sent = true;
  } catch (err: any) {
    console.log(err);
    error = err;
  }

  return {
    error: error,
    sent: sent,
  };
};
