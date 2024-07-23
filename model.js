const mongoose=require('mongoose');
// Connection
const connectionURI = 'mongodb+srv://salim:salim@myportfolio.3t3ddqi.mongodb.net/?retryWrites=true&w=majority&appName=MyPortfolio';
mongoose.connect(connectionURI).then(()=>{console.log("connected")}).catch(()=>{console.log("connection failed");})



// making Schema for data that is going to be inserted in the db
const mySchema = mongoose.Schema({

name:{type:"string",required:"true"},
email:{type:"string",required:"true"},
message:{type:"string",required:"true"}
})

// making object, through which we will interact with db , like insertion
const myModel=mongoose.model('myPortfolioForm',mySchema);

// export it to use in index.js
module.exports=myModel;
