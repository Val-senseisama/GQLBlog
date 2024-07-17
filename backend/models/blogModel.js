import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
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
    likes:[{
        user: { 
            type:mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
     }],
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isLikedByCurrentUser: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Method to check if a user has liked this blog
blogSchema.methods.isLikedByUser = function(userId) {
    return this.likes.some(like => like.user.toString() === userId.toString());
};

// Ensure that a user can only like a blog post once
 blogSchema.index({  "likes.user": 1, _id:1 }, { unique: true });
 blogSchema.index({ author: 1, createdAt: -1 });
 blogSchema.index({ category: 1 });
//Export the model
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
