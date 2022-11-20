import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { asureAuthMiddleware } from '../middleware/authenticated.js'; 
import { 
    createCourseController,
    getCoursesController,
    updateCourseController,
    deleteCourseController

} from '../controllers/course.js';

const md_upload = multiparty({ uploadDir: './uploads/course'})
const api = Router();

api.post('/course',[asureAuthMiddleware, md_upload],createCourseController )//Crear un curso
api.get('/courses', getCoursesController )//Obtener los cursos
api.patch('/course/:id',[asureAuthMiddleware, md_upload],updateCourseController )//Actualizar un curso
api.delete('/course/:id',[asureAuthMiddleware, md_upload],deleteCourseController )//Eliminar un curso




export default api;