import mongose, { mongo } from "mongoose";

const User = mongose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    books: [
        { type: mongose.Schema.Types.ObjectId, ref:'Books'}   // ini nyimpen id nya si books dari model
    ]
    
});

export default mongose.model('Users', User);