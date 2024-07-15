import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async() =>{

    passport.serializeUser((user, done) => {
   //console.log(user);
        done(null, user.id);
    });


    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (error) {
            done(err);
        }
    });

    passport.use(
        new GraphQLLocalStrategy( async(email, password, done) => {
            try {
                const user = await User.findOne({email});
                
                if(!user){
                    throw new Error("Invalid email or password");
                }
                const validPassword = bcrypt.compare(password, user.password);
                if(!validPassword){
                    console.log("Invalid password");
                    throw new Error("Invalid email or password")
                }
               // console.log(user);
                return done(null, user);
            } catch (err) {
                return done(err);
                        }
        })
    )
}