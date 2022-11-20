import PostSchema from '../models/post.js';
import getFilePath from '../utils/image.js';

//functiones

export const createPostController = ( req, res ) => {

    const post = new PostSchema(req.body);
    post.created_at = new Date();

    const imagePath = getFilePath(req.files.miniature);
    post.miniature = imagePath; 

    post.save((error, postStore) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al crear el post'})
        }else{
            return res.status(200).send(postStore)
        }
    });
 };

export const getPostsController = async( req, res ) => {

    const { page = 1, limit = 10 } = req.query;


    const options = {
        page,
        limit: parseInt(limit)
    };

    await PostSchema.paginate({}, options, (error, postStore) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al obtener los post'})
        }else{
            return res.status(200).send(postStore)
        }
    });


};

export const updatePostController = ( req, res ) => {

    const { id } = req.params;
    const postData =  req.body;

    if (req.files.miniature ){
        const imagePath = getFilePath(req.files.miniature);
        return postData.miniature = imagePath;
    }

     PostSchema.findByIdAndUpdate({ _id: id }, postData, ( error ) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al actualizar el post '})
        }else{
            return res.status(200).send({MSG: 'Actualizacion correcta'})
        }
    })

};

export const deletePostController = ( req, res ) => {

    const { id } = req.params;

    PostSchema.findByIdAndDelete(id, ( error ) => {
    
        if( error ){
            return res.status(400).send({MSG: 'Error al eliminar el  post'})
        }else{
            return res.status(200).send({MSG: 'Post eliminado'})
        }
             
        })

};


export const getPostByPathController = ( req, res ) => {

    const { path } = req.params

    PostSchema.findOne({ path }, ( error , postStore) => {
        if( error ){
            res.status(400).send({MSG: 'error al obtener el post'})
        }else{
            res.status(200).send(postStore)
        }
    });

};