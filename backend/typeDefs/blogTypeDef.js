const blogTypeDef = `#graphql
scalar Upload

type Blog {
    _id:ID!
    title: String!
    content: String!
    author: User!
    images:[String!]
    likes: [User!]
    comments: [Comment!]
    category: [String!]!
}

type Query{
    blogs: [Blog!]!
    myBlogs: [Blog!]
    blog(blogId: ID!): Blog
    categoryBlogs(category: String!): [Blog!]
    savedBlogs: [Blog!]
    searchBlogs(name: String!): [Blog]
}

type Mutation{
    createBlog(input: CreateBlogInput!): Blog
    likeBlog(blogId: ID!): Blog
    deleteBlog(blogId: ID!): Blog
    updateBlog(blogId: ID!, input: CreateBlogInput!): Blog
    uploadImage(file: Upload!): String
   
}

input CreateBlogInput{
    title:String!
    content:String!
    images:[String!]
    category:[String!]!
}

# type likeResponse{
#     message:String
# }
`

export default blogTypeDef;