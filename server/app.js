import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from 'dotenv';


const app = express();

//configure dotenv
config();

//Import Routing
import  authRoutes from './router/auth.js';
import  userRoutes from './router/user.js';
import  menuRoutes from './router/menu.js';
import  courseRoutes from './router/course.js';
import  postRoutes from './router/post.js';
import  newsletterRoutes from './router/newsletter.js';

//Configure Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Configure static folder
app.use(express.static('uploads'));


//Configure Header Htpp - CORS
app.use(cors());



//Configure Routings
app.use(`/api/${ process.env.API_VERSION }`, authRoutes);
app.use(`/api/${ process.env.API_VERSION }`, userRoutes);
app.use(`/api/${ process.env.API_VERSION }`, menuRoutes);
app.use(`/api/${ process.env.API_VERSION }`, courseRoutes);
app.use(`/api/${ process.env.API_VERSION }`, postRoutes);
app.use(`/api/${ process.env.API_VERSION }`, newsletterRoutes);




export default app;