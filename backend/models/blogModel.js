import e from 'express';
import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    category:{
        type: [String],
        required:true,
        enum:["technology", "health", "science", "sports", "politics", "entertainment", "education", "fashion", "food", "finance" ]  
    },
    images:{
        type:Array
    },
    likes:{
        type:[{user: { type:mongoose.Schema.Types.ObjectId, ref: 'User'},  _id: mongoose.Schema.Types.ObjectId}],
    },
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
}, {timestamps: true});


// Ensure that a user can only like a blog post once
// blogSchema.index({ author: 1, "likes.user": 1 }, { unique: true });

//Export the model
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;