const commentTypeDef = `#graphql
type Comment {
    _id:ID!
    content:String!
    author:User!
}

type Query {
    comments(blogId:ID!): [Comment!]
    comment(commentId:ID!): Comment
}

type Mutation {
    createComment(input: CreateCommentInput!): Comment
    deleteComment(commentId:ID!): Comment
}

input CreateCommentInput {
    content:String!
    blogId:ID!
}

`;
export default commentTypeDef;
