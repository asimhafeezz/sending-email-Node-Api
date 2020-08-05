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

//be an investor/host apply email
app.post('/sendBeaHostEmail', (req , res) => {

  let {name , description , email , phoneno} = req.body

  const output = `
  <h1 style="color:#fd7014">THANK YOU FOR YOU RESERVATION</h1>
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li><p style="marginTop:1rem"><strong>Name:<strong> ${name} </p></li>
  <li><p style="marginTop:1rem"><strong>Email:<strong> ${email} </p></li>
  <li><p style="marginTop:1rem"><strong>Phone no.:<strong> ${phoneno} </p></li>
  </ul>

  <h3>Message</h3>
  <p style="margin:1.5rem">${description}</p>
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
      subject: "New Investor",
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


//send booking confirmation email to user
app.post('/sendBookingConfirmationEmail', (req , res) => {

  let {name , price , pickUpLocation , returnLocation , pickUpTime , returnTime} = req.body

  const output = `
  <h1 style="color:#fd7014">THANK YOU FOR YOU RESERVATION</h1>
  <hr />
  <h4 style="marginTop:1rem">${name}</h4>
  <p style="marginTop:1rem"><strong>PickUp Location:<strong> ${pickUpLocation} </p>
  <p style="marginTop:1rem"><strong>Return Location:<strong> ${returnLocation} </p>
  <p style="marginTop:1rem"><strong>PickUp Time:<strong> ${pickUpTime} </p>
  <p style="marginTop:1rem"><strong>Return Time:<strong> ${returnTime} </p>
  <p style="marginTop:1rem"><strong>Total Price:<strong> ${price} </p>

  <h6 style="marginTop:1rem">For Futhur Details Please visit our Website.</h6>
  <br />
  <br />
  <p><strong>Take Care , Have a nice day</strong></p>
  `

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'safarcarecenter@gmail.com',
        pass: 'fyp123456' // naturally, replace both with your real credentials or an application-specific password
      },
      tls: {
          rejectUnauthorized:false
      }
    });
    
    const mailOptions = {
      from: '"Safar Management" <safarcarecenter@gmail.com>',
      to: 'safarcarecenter@gmail.com',
      subject: "Vehicle Reservation",
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

app.listen(3331 , () => console.log('server started...'))