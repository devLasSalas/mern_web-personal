import { Schema, model } from 'mongoose';

const MenuSchema =  new Schema({
    title: String,
    path: String,
    order: Number,
    active: Boolean,


});

export default model('Menu', MenuSchema)