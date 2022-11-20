import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    active: {
        type: Boolean,
        default: function() {
            return false
        }
    },
    avatar: String,
});

export default model('User', UserSchema);