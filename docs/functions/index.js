/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configura el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio como 'outlook', 'yahoo', etc.
  auth: {
    user: 'tu-email@gmail.com', // Tu dirección de correo electrónico
    pass: 'tu-contraseña' // Tu contraseña de correo electrónico
  }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  // Configura CORS para permitir solicitudes desde tu dominio
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Si es una solicitud OPTIONS, responde con 200 OK
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: 'tu-email@gmail.com', // Tu dirección de correo electrónico
    to: 'contact@hollowsense.com', // El correo electrónico de destino
    subject: subject,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando el correo:', error);
      res.status(500).send('Error enviando el correo');
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
