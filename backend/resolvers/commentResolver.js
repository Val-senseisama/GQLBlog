import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";

const CommentResolver = {
    Query:{
        comments: async (p, {blogId}, context) =>{
            try {
                const comments = await Comment.find({blog: blogId});
                return comments;
            } catch (error) {
                console.log("Error in comments query:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        comment: async (p, {commentId}, context) =>{
            try {
                const comment = await Comment.findById(commentId);
                return comment;
            } catch (error) {
                console.log("Error in comment query:", error);
                throw new Error(error.message || "internal server error");
            }
    }
},
Mutation: {
    createComment: async (p, {input}, context) =>{
        try {
            const {content, blogId} = input;
            const user = await context.getUser();
            const comment = new Comment({
                author: user._id,
                content,
                blog: blogId
            });
            await comment.save();
            return comment;
        } catch (error) {
            console.log("Error in createComment:", error);
            throw new Error(error.message || "internal server error");
        }
    },
    deleteComment: async (p, {commentId}, context) =>{
        try {
            const comment = await Comment.findByIdAndDelete(commentId);
            return comment;
        } catch (error) {
            console.log("Error in deleteComment:", error);
            throw new Error(error.message || "internal server error");
        }
    }
},
Comment: {
    author: async (parent) =>{
        try {
            const author = await User.findById(parent.author);
            return author;
        } catch (error) {
            console.log("Error in comment author resolver:", error);
            throw new Error(error.message || "internal server error");
        }
    }
}
}

export default CommentResolver;