import { Router } from 'express';
import { asureAuthMiddleware } from '../middleware/authenticated.js';
import {
    suscribeEmailController,
    getEmailsController,
    deleteEmailController

}from '../controllers/newsletter.js'


const api = Router();

api.post('/newsletter', suscribeEmailController);
api.get('/newsletter', [asureAuthMiddleware], getEmailsController);
api.delete('/newsletter/:id', [asureAuthMiddleware], deleteEmailController);







export default api;