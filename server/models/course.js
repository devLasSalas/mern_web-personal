import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const CourseSchema = new Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,    
});

CourseSchema.plugin(mongoosePaginate);

export default model('Course', CourseSchema );