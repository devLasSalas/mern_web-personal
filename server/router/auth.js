import { Router } from 'express';
import { 
    authLoginController, 
    authRegisterController 
} from '../controllers/auth.js';


const api = Router();

api.post('/auth/register', authRegisterController ); //Registro auth
api.post('/auth/login', authLoginController ); //Login auth



export default api;
