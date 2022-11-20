import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const NewsletterSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
});

NewsletterSchema.plugin(mongoosePaginate);

export default model('Newsletter', NewsletterSchema );