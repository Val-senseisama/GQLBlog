import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    blogs:{
        type:Array,
        default:[],
    },
    profilePic:{
        type:String,
    },
    likedBlogs:{
        type: [{blog:{ type:mongoose.Schema.Types.ObjectId, ref: 'Blog'}}],
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordRefreshToken: String,
    passwordResetExpiresAt: Date,
}, {timestamps: true});


//Export the model
const User = mongoose.model('User', userSchema);
export default User;