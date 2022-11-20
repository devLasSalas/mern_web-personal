import { Router } from 'express';
import { 
    createMenuController,
    getMenusController,
    updateMenuController,
    deleteMenuController

 } from '../controllers/menu.js';
import {asureAuthMiddleware} from '../middleware/authenticated.js';

const api = Router();

//ENDPOINTS
api.post('/menu', [asureAuthMiddleware], createMenuController ); //crear menu
api.get('/menu', getMenusController ); //Obtener todos los menus(true o false)
api.patch('/menu/:id', [asureAuthMiddleware], updateMenuController ); //Actualizar un menu por el id
api.delete('/menu/:id', [asureAuthMiddleware], deleteMenuController ); //Actualizar un menu por el id





export default api;

