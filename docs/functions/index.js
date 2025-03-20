/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

// Configura el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

// Función para enviar correos
exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    const {name, email, subject, message} = req.body;

    const mailOptions = {
      from: functions.config().gmail.email,
      to: "contact@hollowsense.com",
      subject: subject,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error enviando el correo:", error);
        res.status(500).send("Error enviando el correo");
      } else {
        console.log("Correo enviado:", info.response);
        res.status(200).send("Correo enviado con éxito");
      }
    });
  });
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
