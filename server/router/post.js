import { Router } from 'express';
import { asureAuthMiddleware } from '../middleware/authenticated.js'
import multiparty from 'connect-multiparty'
import { 
    createPostController,
    getPostsController,
    updatePostController,
    deletePostController,
    getPostByPathController
        
} from '../controllers/post.js';

const md_upload = multiparty({ uploadDir: './uploads/blog'})
const api = Router();

api.post('/post',[asureAuthMiddleware, md_upload], createPostController ); //Creacion de un post
api.get('/post', getPostsController); //Obtencion y paginacion de los pots
api.patch('/post/:id', [asureAuthMiddleware, md_upload], updatePostController); //Actualizar un post
api.delete('/post/:id' ,[asureAuthMiddleware],deletePostController ); // Eliminar un post
api.get('/post/:path',getPostByPathController ); // obtener un post por su path





export default api;