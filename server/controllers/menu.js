import MenuSchema from '../models/menu.js';

export const createMenuController = async( req, res ) => {
    
    const menu = await  new MenuSchema( req.body );

   await  menu.save((error, menuStore) => {
        if( error ){
            return  res.status(400).send({MSG: 'Error al crear el menu'});
        }else{
            return res.status(200).send(menuStore)
        }
    })


;}

export const getMenusController = async( req, res ) => {
    
    const { active } = req.query;

    let response = null;

    if( active === undefined ){
        response = await MenuSchema.find().sort({ order: 'asc'});
    }else{  
        response = await MenuSchema.find({ active }).sort({ order: 'asc' });
    }

    if( !response ){
        return res.status(400).send({MSG: 'No se ha encontrado ningun menu'})
    }else{
        return  res.status(200).send( response )
    }

};

export const updateMenuController = async( req, res ) => {
    
    const { id } = req.params;
    const menuData =  req.body;

    MenuSchema.findByIdAndUpdate({ _id: id }, menuData, ( error ) => {
        if( error ){
            return res.status(400).send({MSG: 'Error al actualizar el menu '})
        }else{
            return res.status(200).send({MSG: 'Actualizacion correcta'})
        }
    })

};

export const deleteMenuController = async( req, res ) => {

    const { id } = req.params;

    MenuSchema.findByIdAndDelete(id, ( error ) => {
    
    if( error ){
        return res.status(400).send({MSG: 'Error al eliminar el  menu'})
    }else{
        return res.status(200).send({MSG: 'Menu eliminado'})
    }
         
    })
};

