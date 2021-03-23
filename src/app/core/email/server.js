//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance 
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//start application server on port 4200
app.listen(4200, () => {
    console.log("The server started on port 4200");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
        } else {
            console.log("Email has been sent");
            res.send(info);
        }
    });
});

const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "rajalg05@gmail.com",
            pass: "Mahavir123#"
        }
    });
}

const mailOptions = {
    //from: `"<Sender’s name>", "<Sender’s email>"`,
    //to: `<${user.email}>`,
    from: `"rajalg05@gmail.com"`,
    to: `"bls.divine@gmail.com"`,
    subject: "<Message subject>",
    html: "<h1>And here is the place for HTML</h1>"
};

transporter.sendMail(mailOptions, callback);

// Sending an email with attachments using emailJS 
var email = require('emailjs/email');
sendmail = function (req, res) {

    var server = email.server.connect({
        user: "rajalg05@gmail.com",
        password: "Mahavir123#",
        host: "smtp.gmail.com",
        ssl: true,
        port: 465
    });
}

server.send({
    text: "Your message body text",
    from: "rajalg05@gmail.com",
    to: "bls.divine@gmail.com",
    subject: "Your message subject",
    attachment:
        [
            { data: "<html><strong>A bit of HTML text</strong></html>", alternative: true },
            { path: "user/desktop/file.pdf", type: "application/pdf", name: "renamed.pdf" }
        ]
}, function (err, message) {
    if (err)
        console.log(err);
    else
        res.json({ success: true, msg: 'sent' });
});     

router.post('/sendmail', actions.sendmail);