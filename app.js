import express from 'express';
import 'dotenv/config';
import { DBConnect } from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expenseroute, signinroute, signuproute } from './routes/authroutes.js';
import { ensureAuthenticated } from './middleware/auth.js';

const app = express();



//db connect
DBConnect().then(() => console.log('DB Connected!'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//cors
const corsOptions = {
    //origin: 'https://employee-management-system-nik.netlify.app', 
    origin: 'http://localhost:3000', 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    credentials: true, 
  };
  
  app.use(cors(corsOptions)); 


//routes

app.use('/signinpage' , signinroute);
app.use('/signuppage' , signuproute);
app.use('/expenses' , ensureAuthenticated ,expenseroute);



const PORT = process.env.PORT || 3009;

app.listen(PORT , ()=>{
    console.log(`server start on ${PORT}`);
    
})