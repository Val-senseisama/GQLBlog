import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			_id
			name
			email
			gender
		}
	}
`;

export const LOGIN = gql`
mutation Login($input:LoginInput!){
	login(input:$input){
		email
		password
	}
}
`;


export const LOGOUT = gql`
mutation Logout{
	logout{
		message
	}
}
`;
export const SAVE_BLOG = gql`
mutation SaveBlog($blogId:ID!){
	saveBlog(blogId:$blogId){
		_id
		name
		email
	}
}
`;

export const UNSAVE_BLOG = gql`
mutation UnsaveBlog($blogId: ID!) {
  unsaveBlog(blogId: $blogId) {
    _id
    title
  }
}`;

export const EDIT_USER = gql`
mutation EditUser($input: EditUserInput!){
	editUser(input: $input){
		_id
			name
			email
			gender
			profilePic
	}
}
`;