const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const host = '127.0.0.1';
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user');
const db = require('./config/database');
const session = require('express-session')
const MongoDbSession=require('connect-mongodb-session')(session);
const {setSession} = require('./utils/session')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({

	storage:storage
})

//Environment Variables
dotenv.config({path:'./config/congif.env'});

//Database
db();

//Prevent cors policies
app.use(cors())

//Body Parser
app.use(express.json());

//Basic Routing
app.use('/api/v1/product',upload.single('img'),productRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/user',userRouter);


app.listen(PORT,()=>{
	console.log(`Server is listening in ${host} on port ${PORT}`)
})



