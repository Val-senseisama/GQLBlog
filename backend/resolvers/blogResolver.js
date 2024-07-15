import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import cloudinary from 'cloudinary';

const blogResolver = { 
    Upload: GraphQLUpload,
    Query: {
        blogs: async(p, a, context) => {
            try {
                const blogs = await Blog.find().populate('author').populate('likes').populate('comments');
                return blogs;
            } catch (error) {
                console.log("Error in blogs query:", error);
                throw new Error(error.message || "internal server error");
            }
        },
         myBlogs: async(p, a, context) => {
            const user = await context.getUser()._id
            console.log(user);
            try {
                const blogs = await Blog.find({author: user}).populate('author').populate('likes').populate('comments');
                return blogs;
            } catch (error) {
                console.log("Error in my blogs query:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        blog: async(p, {blogId}, context) => {
            try {
                const blog = await Blog.findById(blogId).populate('likes','_id name email profilePic');
                return blog;
            } catch (error) {
                console.log("Error in blog query:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        categoryBlogs: async(p, {category}, context) => {
            try {
                const blogs = await Blog.find({category: category});
                return blogs;
            } catch (error) {
                console.log("Error in categoryBlogs query:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        savedBlogs: async(p, a, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const savedBlogs = await User.findById(user._id).populate('blogs');
                const blogs = savedBlogs.blogs.map(async blog => await Blog.findById(blog).populate('author').populate('likes').populate('comments'));
                console.log(blogs);
                console.log(savedBlogs.blogs);
                return blogs;
            } catch (error) {
                console.log("Error in savedBlogs query:", error);
                throw new Error(error.message || "internal server error");
            }
        }
    }, 
    Mutation: {
        createBlog: async(p, {input}, context) => {
            try {
                const {title, content, images, category} = input;
                const blog = new Blog({
                    title,
                    content,
                    images,
                    category,   
                    author: context.getUser()._id
                 });


                 // save the blog
                await blog.save();
                return blog;
                } catch (error) {
                console.log("Error in createBlog:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        likeBlog: async(p, {blogId}, context) => {
            try {
                let user = await context.getUser();
                user = await User.findById(user._id).populate("likedBlogs");
              
        
                const blog = await Blog.findById(blogId);
                if(!blog){
                    throw new Error("Blog not found");
                }
        
                // Check if the blog is already liked by the user
                const liked = await user.likedBlogs.find(likedBlog => likedBlog._id.toString() === blogId);

                if(liked){
                    // If liked, unlike the blog
                    user.likedBlogs = user.likedBlogs.filter(likedBlog => likedBlog._id.toString() !== blogId);
                    blog.likes = blog.likes.filter(like => like.user.toString() !== user._id.toString());
                } else {
                    // If not liked, like the blog
                    user.likedBlogs.push(blog._id);
                    blog.likes.push({ user: user._id });
                }
                    await blog.save();
                    await user.save();
                    const populatedBlog = await Blog.findById(blogId).populate('author').populate('likes').populate('comments');
                    return populatedBlog;
            } catch (error) {
                console.log("Error in likeBlog:", error);
                throw new Error(error.message || "Internal server error");
            }
        },
        
        deleteBlog: async(p, {blogId}, context) => {
            try {
                const user = await context.getUser();
                const blog = await Blog.findById(blogId);
                if(!blog){
                    throw new Error("Blog not found");
                }
                if(user._id.toString() !== blog.author.toString()){
                    throw new Error("You are not authorized to delete this blog");
                }
                await Blog.findByIdAndDelete(blogId);
                return blog;
            } catch (error) {
                console.log("Error in deleteBlog:", error);
                throw new Error(error.message || "internal server error");
            }
        }, 
        updateBlog: async(p, {blogId, input}, context) => { 
            try {
                const user = await context.getUser();
                const blog = await Blog.findById(blogId);
                if(!blog){
                    throw new Error("Blog not found");
                }
                if(user._id.toString() !== blog.author.toString()){
                    throw new Error("You are not authorized to update this blog");
                }
                const {title, content, images, category} = input;
                blog.title = title;
                blog.content = content;
                blog.images = images;
                blog.category = category;
                await blog.save();
                return blog;
            } catch (error) {
                console.log("Error in updateBlog:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        uploadImage: async (_, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();
            console.log("backend trying to upload img:", filename);
      
            // Upload to Cloudinary
            try {
              const result = await new Promise((resolve, reject) => {
                const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
                  { folder: 'gqlBlog' }, // Optional: Specify folder in Cloudinary
                  (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                  }
                );
      
                stream.pipe(cloudinaryStream);
              });
      
              return result.secure_url; // Return the URL of the uploaded image
            } catch (error) {
              console.error('Error uploading image:', error);
              throw new Error('Failed to upload image', error);
            }
          },
    },
    Blog: {
        comments: async(parent) => {
            try {
                const comments = await Comment.find({blog: parent._id}).populate("author");
                return comments;
            } catch (error) {
                console.log("Error in comments resolver:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        author: async(parent) => {
            try {
                const   author = await User.findById(parent.author);    
                return author;
            } catch (error) {
                console.log("Error in author resolver:", error);
                throw new Error(error.message || "internal server error");
            }

    },
    // likeCount: async(parent) => {
    //     try {
    //         const blog = await Blog.findById(parent._id);
    //         return blog.likes.length;
    //     } catch (error) {
    //         console.log("Error in likeCount resolver:", error);
    //         throw new Error(error.message || "internal server error");
    //     }
    // }
}
};

export default blogResolver;
 