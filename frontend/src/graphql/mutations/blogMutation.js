import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      _id
      title
      content
      category
      images
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog( $blogId: ID!, $input: CreateBlogInput!) {
    updateBlog(blogId: $blogId, input: $input) {
      _id
      title
      content
      category
      images
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file)
  }
`;

export const LIKE_BLOG = gql`
mutation LikeBlog($blogId: ID!){
    likeBlog(blogId: $blogId){
        _id
        title
        category
        images
        likes {
              _id
        }
        isLikedByCurrentUser
    }
}
`;

export const DELETE_BLOG = gql`
mutation DeleteBlog($blogId: ID!) {
    deleteBlog(blogId : $blogId) {
        _id
    }
}
`;

