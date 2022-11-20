 import CourseSchema from '../models/course.js';
 import getFilePath from '../utils/image.js';

 //functiones

 export const createCourseController = async( req, res ) => {

    const course =   CourseSchema(req.body);
    if(req.files.miniature){
        const imagePath = getFilePath(req.files.miniature);
        course.miniature = imagePath;
        
    }

     course.save((error, courseStore) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al crear el curso'})
        }else{
            return res.status(200).send(courseStore)
        }
    });
 };

 export const getCoursesController = ( req, res ) => {

    const { page = 1, limit = 10 } = req.query;


    const options = {
        page,
        limit: parseInt(limit)
    };

    CourseSchema.paginate({}, options, (error, courses) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al obtener los cursos'})
        }else{
            return res.status(200).send(courses)
        }
    });

 

 };

 export const updateCourseController = ( req, res ) => {

    const { id } = req.params;
    const courseData =  req.body;

    if(req.files.miniature){
        const imagePath = getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }

    CourseSchema.findByIdAndUpdate({ _id: id }, courseData, ( error ) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al actualizar el curso '})
        }else{
            return res.status(200).send({MSG: 'Actualizacion correcta'})
        }
    })

 };

 export const deleteCourseController = ( req, res ) => {

    const { id } = req.params;

    CourseSchema.findByIdAndDelete(id, ( error ) => {
    
        if( error ){
            return res.status(400).send({MSG: 'Error al eliminar el  menu'})
        }else{
            return res.status(200).send({MSG: 'Menu eliminado'})
        }
             
        })
 };