import { Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const PostSchema = new Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true
    },
    created_at: Date,
});

PostSchema.plugin(mongoosePaginate)


export default model('Post', PostSchema)