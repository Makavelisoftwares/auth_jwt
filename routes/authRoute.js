const Router=require('express').Router();
const controller=require('../controllers/authContoller');

Router.post('/register',controller.register_post);
Router.post('/login',controller.login_post);


module.exports= Router;