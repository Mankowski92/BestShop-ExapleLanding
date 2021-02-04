const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "*" }));

app.use("/public", express.static(process.cwd() + "/public"));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "testmail03072020@gmail.com",
    pass: "PaSS1234",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: `${data.name}`,
      to: data.email,
      subject: "Potwierdzenie otrzymania prośby kontaktu",
      text: `Cześć ${data.name}!

Potwiedzamy otrzymanie Twojego maila!
Skontaktujemy się z Tobą niezwłocznie : )
        
Miłego dnia!
Zespół BestShop`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});