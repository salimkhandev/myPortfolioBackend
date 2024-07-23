const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const MyModel = require('./model');
const adminPanel=require('./AdminPanel')
app.use('/admin',adminPanel);
// use cros
var cors = require('cors')
const port = process.env.PORT ||3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{


  res.send("Hello Salim ❤️ How are you")
})

app.post('/submit-form', async (req, res) => {
  // const recaptchaToken = req.body['g-recaptcha-response'];when not using react
  const {name,email,message,recaptchaToken} = req.body;
  console.log(recaptchaToken);

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'No reCAPTCHA token provided' });
  }

  const secretKey = '6LfPzhUqAAAAAKUx6lOn3nisQJ859Xz3NbSJLdxn'; 
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(verificationUrl);
    if (response.data.success) {
      res.json({ message: 'Captcha successfully verified' });


      const newData=new MyModel({name:name,email:email,message:message}).save()
  .then(() => console.log('Data saved successfully!'))
  .catch(error => console.error('Error saving data:', error));


    } 
    else {
      console.log("❌");
            const newData=new MyModel({name:name,email:email,message:message}).save()

  .then(() => console.log('Data saved successfully!'))
  .catch(error => console.error('Error saving data:', error));
      res.status(400).json({ message: 'Captcha please verification failed ❌' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
