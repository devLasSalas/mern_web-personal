import { jwtVerify } from "jose";

export const asureAuthMiddleware = async( req, res , next )  => {

    if(!req.headers.authorization) {
       return  res
        .status(401)
        .send({MSG: 'La peticion no tiene la cabecera de authenticación'})
    };

    const token = req.headers.authorization;

    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );

        req.id = payload.id;
        
        next();
        
    } catch (error) {
        return res.status(400).send({MSG: 'Token invalido'})

    };

};