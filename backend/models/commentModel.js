import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:'true'
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required:'true'
    },
}, {timestamps: true});

//Export the model
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;