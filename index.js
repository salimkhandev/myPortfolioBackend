const express = require('express');
const cors=require('cors');
const MyModel = require('./model');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(express.json());




const newData=new MyModel({name: 'Salim Khan',email: 'salim@gmail.com',message:"Hello my name is salim"}).save()
  .then(() => console.log('Data saved successfully!'))
  .catch(error => console.error('Error saving data:', error));





app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
   console.log(`Server is running on http://localhost:3000`);
});