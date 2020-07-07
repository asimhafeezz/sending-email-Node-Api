const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//cors
app.use(cors())


app.get('/', (res, req) => {
    res.send('Hello')
})

app.post('/send', (req , res) => {

    let {name , subject , email , message} = req.body

    const output = `
    <h1>Customer Care: Transport Facility For Tourisum</h1>
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    </ul>

    <h3>Message</h3>
    <p>${message}</p>
    <br />
    <br />
    <p><strong>Take Care , Have a nice day</strong></p>
    `

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tourisumtransportfacility@gmail.com',
          pass: 'fyp123456' // naturally, replace both with your real credentials or an application-specific password
        },
        tls: {
            rejectUnauthorized:false
        }
      });
      
      const mailOptions = {
        from: '"Customer Care" <tourisumtransportfacility@gmail.com>',
        to: 'safarcarecenter@gmail.com',
        subject: subject,
        html:output
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.end({msg:'error'})
        } else {
          console.log('Email sent: ' + info.response);
            res.end(`email sent`)
        }
      });

})

app.listen(5000 , () => console.log('server started...'))