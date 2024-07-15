
import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        signUp: async(p, {input}, context) => {
            try {
                const {email, name, password, gender, profilePic} = input;
                
                // Check if all fields are provided
                if(!email || !name ||!password || !gender){
                    throw new Error("All fields are required");
                }

                // Check if user already exists
                const existingUser = await User.findOne({email});
                if(existingUser){
                    throw new Error("User already exists");
                }

                // Hash the password and provide profilePic if not provided
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
                const defaultProfilePic = gender === "male" ? boyProfilePic : girlProfilePic
                
                // Create the user
                const newUser = new User({
                    email,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePic: profilePic ? profilePic : defaultProfilePic
                });
                await newUser.save();
                await context.login(newUser);
                return(newUser);


            } catch (error) { 
                console.log("Error in signup:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        login: async(p, {input}, context) => {
            try {
                const {email, password} = input;

                // Check if all fields are provided
                if(!email || !password){
                    throw new Error("All fields are required");
                }

                // Authenticate the user
                const {user} = await context.authenticate("graphql-local", {email, password})
                await context.login(user);
                return user;

            } catch (error) {
                console.log("Error in login:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        logout: async(p, a, context) => {
            try {

                await context.logout();
                context.req.session.destroy((err)=>{
                    if (err) throw err;
                });
                context.res.clearCookie("connect.sid");
                return {message: "Logged out successfully"};


            } catch (error) {
                console.log("Error in logout:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        saveBlog: async(p, {blogId}, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const updatedUser = await User.findByIdAndUpdate(user._id, {$addToSet: {blogs: blogId}}, {new: true});
                return updatedUser;
            } catch (error) {
                console.log("Error in saveBlog:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        unsaveBlog: async(p, {blogId}, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const updatedUser = await User.findByIdAndUpdate(user._id, {$pull: {blogs: blogId}}, {new: true});
                return updatedUser;
            } catch (error) {
                console.log("Error in unsaveBlog:", error);
                throw new Error(error.message || "internal server error");
            }
        }
    },
    Query: {
        authUser: async(p, a, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                  return
                }
                // Ensure likedBlogs is an array
                const populatedUser = await User.findById(user._id).populate('likedBlogs');
                console.log("Populated User:", populatedUser.likedBlogs);
                return populatedUser;
                }   
            catch (error) {
                console.log("Error in authUser:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        user: async(p, {userId}, context) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.log("Error in user query:", error);
                throw new Error(error.message || "internal server error");
            }
        }       
    },
    User: {
        blogs: async(parent) => {
            try {
                const blogs = await Blog.find({author: parent._id});
                return blogs;
            } catch (error) {
                console.log("Error in user blogs resolver:", error);
                throw new Error(error.message || "internal server error");
            }
        },
        likedBlogs: async(parent) =>{
            try {
               const likedBlogs = await User.findById(parent._id).populate("likedBlogs");
               return likedBlogs; 
            } catch (error) {
                console.log("Error in user likedBlogs resolver:", error);
                throw new Error(error.message || "internal server error");
            }
        }    
}
}

export default userResolver;