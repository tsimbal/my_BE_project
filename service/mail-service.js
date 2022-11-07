import nodemailer from 'nodemailer';

export default {
  sendActivationMail: async (to, link) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activation link ${process.env.API_URL}`,
      text: '',
      html: `
      <div><h1>Activation Account</h1>
        <a href="${link}">Activation</a>
      </div>
      `,
    });
  },
};
