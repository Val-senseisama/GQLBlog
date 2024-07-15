import { gql } from '@apollo/client';

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      email
      name
      profilePic
    }
  }
`;
export const GET_USER_SAVED_BLOGS = gql`
query GetUserSavedBlogs($userId: ID!) {
  user(id: $userId) {
    blogs {
      _id
    }
  }
}`;