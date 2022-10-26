// initializing the packages
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const helmet=require('helmet');
const {sequelize}=require('./models')


