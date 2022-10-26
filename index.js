// initializing the packages
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const helmet=require('helmet');
const {sequelize}=require('./models');
const port=5000;
const authRoutes=require('./routes/authRoute');


// using the middlewares and setting the view engine  
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.static('public'));
app.set('view engine','ejs');


// connecting to mysql database 
sequelize.authenticate()
.then(()=>{
    app.listen(port,()=>{
        console.log(`listening request at port http://localhost:${port}`)
    })

    console.log('connected to mysql database')
})
.catch((err)=>console.log(err))


// using routes  
app.use(authRoutes);