const userTypeDef = `#graphql
scalar Upload
type User {
    _id:ID
    name: String!
    email: String!
    password: String!
    likedBlogs: [Blog!]
    profilePic:String
    gender:String!
    blogs: [Blog!]
    refreshToken: String
    passwordChangedAt: String
    passwordRefreshToken: String
    passwordResetExpiresAt: String
}

type Query {
    authUser:User
    user(userId: ID!): User
}

type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout:LogoutResponse
    saveBlog(blogId:ID!):User 
    unsaveBlog(blogId: ID!): User
    editUser(input: EditUserInput!): User
    uploadImage(file: Upload!): String
}

input SignUpInput{
    name:String!
    password:String!
    gender:String!
    profilePic:String
    email:String!
}

input EditUserInput{
    name:String
    password:String
    profilePic:String
    email:String!
    }

input LoginInput{
    email:String!
    password:String!
}

type LogoutResponse{
    message: String
}
`

export default userTypeDef;