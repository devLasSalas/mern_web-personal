import { Router } from "express";
import multiparty from 'connect-multiparty';
import {
    CreateUserController,
    GetMeController,
    GetUsersController,
    UpdateUserController,
    DeleteUserController

} from '../controllers/user.js';
import { 
    asureAuthMiddleware

 } from "../middleware/authenticated.js";


const md_upload = multiparty({ uploadDir: './uploads/avatar' })
const api = Router();

api.get('/user/me',[asureAuthMiddleware],GetMeController ); //obtener datos del usuario logeado
api.get('/users',[asureAuthMiddleware],GetUsersController ); //Obetener datos de todos los usuarios
api.post('/user',[asureAuthMiddleware, md_upload],CreateUserController ); // Crear un usuario desde el panel 
api.patch('/user/:id',[asureAuthMiddleware, md_upload],UpdateUserController ); // Actualizar un usuario desde el panel 
api.delete('/user/:id',[asureAuthMiddleware],DeleteUserController ); // Eliminar un usuario desde el panel 



 
export default api;



