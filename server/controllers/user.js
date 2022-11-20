import UserSchema from '../models/user.js'
import bcrypt from 'bcryptjs';
import getFilePath from '../utils/image.js';
import { hash } from 'bcrypt';

export const GetMeController = async( req, res ) => {
    
    const { id } = req;

    const response = await UserSchema.findById( id );
    if( !response ){
        res.status(400).send({MSG: 'No se ha encontrado usuario'});
    }else{
        res.status(200).send(response);
    }; 

};

export const GetUsersController = async( req, res ) => {

    const { active } = req.query;
    let response = null;

    if( active === undefined ){
        response = await UserSchema.find();
    }else{
        response = await UserSchema.find({ active });
    }

    res.status(200).send( response )
};

export const CreateUserController = async( req, res ) => {

    const { password } = req.body;        
    const hashedPassword = await hash(password, 10);


    const user = new UserSchema({ ...req.body, active: false, password: hashedPassword });

    if(req.files.avatar){
        const imagePath = getFilePath(req.files.avatar);
        
        user.avatar = imagePath
    }

    user.save((error, userStore) => {
        if( error ){
            res.status(400).send({MSG: 'Error al crear el usuario o usuario ya existente'})
        }else{
            res.status(200).send(userStore)
        }
    });
};

export const UpdateUserController = async( req, res ) => {

    const { id } = req.params;
    const userData = req.body;

    //Encriptar pass a la hora de actualizarla de nuevo

    if( userData.password){

        const hashedPassword = await hash(userData.password, 10)
        userData.password = hashedPassword

    }else{

         delete userData.password;
    }   

    //Gestion de avatar por si se quiere subir uno
    if(req.files.avatar){
        const imagePath = getFilePath(req.files.avatar)
        userData.avatar = imagePath;
    }

     UserSchema.findByIdAndUpdate( { _id: id }, userData , ( error ) => {
        if( error ){
            res.status(400).send({MSG: 'Error al actualizar el usuario'})
        }else{
            res.status(200).send({MSG: 'Actualizacion correcta'})
        }
    });

};

export const DeleteUserController = ( req, res) => {

    const { id } = req.params;

    UserSchema.findByIdAndDelete({_id: id }, ( error ) => {
    
    if( error ){
        res.status(400).send({MSG: 'Error al eliminar el usuario'})
    }else{
        res.status(200).send({MSG: 'Usuario eliminado'})
    }
         
    })
};