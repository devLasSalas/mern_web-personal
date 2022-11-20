import UserSchema from '../models/user.js'
import { compare, hash  } from 'bcrypt';
import { SignJWT } from 'jose';


export const authRegisterController = async( req, res ) => {

    const {firstname, lastname, email, password, avatar, active, role } = req.body;

    const existingUserByEmail = await UserSchema.findOne({ email }).exec();
    if( existingUserByEmail ) return res.status(409).send({MSG: 'Ya existe un usuario con ese email registrado '})

    const hashedPassword = await hash(password, 10);

    const user = new UserSchema({
        firstname,
        lastname,
        email,
        active,
        role,
        avatar,
        password: hashedPassword
    });

    await user.save();
    return res.status(200).send({MSG: 'Usuario registrado con éxito'})

};

export const authLoginController = async ( req, res ) => {

    const { email, password } = req.body;

    const existingUserByEmail = await UserSchema.findOne({ email }).exec();
    if( !existingUserByEmail)
    return res.status(401).send({MSG: 'Credenciales incorrectas'});

    const checkPassword = await compare(password, existingUserByEmail.password);
    if( !checkPassword )
    return res.status(401).send({MSG: 'Credenciales incorrectas'});

    const jwtConstructor = new SignJWT({ id:existingUserByEmail._id });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT'
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt })
};
 



