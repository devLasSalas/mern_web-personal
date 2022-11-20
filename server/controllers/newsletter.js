import NewsletterSchema from '../models/newsletter.js';

export const suscribeEmailController = ( req, res ) => {

    const { email } = req.body;
    if( !email ) return res.status(401).send({MSG: 'Email obligatorio'});

    const newsletter = new NewsletterSchema({ email });

    newsletter.save((error) => {
        if( error ){
            return res.status(401).send({MSG: 'El email ya esta registrado'})
        }else{
            return res.status(200).send({MSG: 'Email registrado'})
        }
    })
    
};

export const getEmailsController = ( req, res ) => {

    const { page = 1 , limit = 10} = req.query;

    const options = {
        page: parseInt( page ),
        limit: parseInt( limit )
    };

    NewsletterSchema.paginate({}, options, ( error, emailsStore ) => {
        if( error ){
            return res.status(401).send({MSG: 'Error al obtener los Emails'})
        }else{
            return res.status(200).send(emailsStore)
        };
    });


};

export const deleteEmailController = ( req, res ) => {

    const { id } = req.params ;

    NewsletterSchema.findByIdAndDelete( id, (error)=> {
        if( error ){
            return res.status(401).send({MSG: 'Error al eliminar el correo '})
        }else{
            return res.status(200).send({MSG: 'Email eliminado correctamente'})
        }
    })

};

