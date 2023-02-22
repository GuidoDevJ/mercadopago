import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(`${process.env.API_SECRET_SENDGRID}`);

async function sendEmail(to,code) {
	return await sgMail
		.send({
			to,
			from: 'guidogauna9@gmail.com',
			subject: `Codigo de Verificacion`,
			text: `Su codigo de verificacion es ${code}`,
			html: `<h2>Su codigo de verificacion es ${code}</h2>`,
		})
		.then(() => {
			console.log(`email sent`);
            return true
		})
		.catch((err) => {
			console.log(err);
            return err
		});
}

export { sendEmail };