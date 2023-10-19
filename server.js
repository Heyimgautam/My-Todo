const express = require('express')
const cookieParser = require('cookie-parser')
const connectDatabase = require('./database/database')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const errorMiddleware = require('./middleware/error.js')
const cors = require('cors')

const {config} = require('dotenv')
const app = express();


//configuring the dotenv 
config({
    path : "./database/.env"
})

connectDatabase();
//middlewares
app.use(express.json());
app.use(cookieParser());  //this is for connecting cookies and apis from controller to router.
app.use(cors({
    origin : [process.env.FRONTENT_URL],
    method : ["GET","POST","PUT","DELETE"],
    credentials : true
 }))


//using routers
app.use('/api/v1/user',userRouter);
app.use('/api/v1/task',taskRouter);

//backendInterface
app.get('/',(req,res)=>{
    res.json({
        success : true,
        message : "Greetings! from Backend"
    })
})

//applying error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

