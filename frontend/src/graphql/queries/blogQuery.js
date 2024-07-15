import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
query GetBlogs{
    blogs{
        _id
        title
        content
        author{
                _id
                profilePic
                name
        }
        images
        category
        likes{
            _id
        }
        comments{
            _id
            content
            author{
                _id
                profilePic
                name
        }
        }
    }
}
`;

export const GET_MY_BLOGS = gql`
query GetMyBlogs{
    myBlogs{
        _id
        title
        content
        author{
                _id
                profilePic
                name
        }
        images
        category
        likes{
            _id
        }
        comments{
            _id
            content
            author{
                _id
                profilePic
                name
        }
        }
    }
}
`;

export const GET_BLOG = gql`
query GetBlog($id: ID!){
    blog(blogId: $id){
        _id
        title
        content
        author {
                _id
                profilePic
                name
        }
        images
        category
        likes{
            _id
        }
        comments{
            _id
            content
            author{
                _id
                profilePic
                name
        }
        }
    }
}
`;

export const GET_CATEGORY_BLOGS = gql`
query GetCategoryBlogs($category: String!){
    categoryBlogs(category: $category){
        _id
        title
        content
        author{
                _id
                profilePic
                name
        }
        images
        category
        likes{
            _id
        }
        comments{
            _id
            content
            author{
                _id
                profilePic
                name
        }
        }
    }
}
`;

export const GET_SAVED_BLOGS = gql`
query GetSavedBlogs{
    savedBlogs{
        _id
        title
        content
        author{
                _id
                profilePic
                name
        }
        images
        category
        likes{
            _id
        }
        comments{
            _id
            content
            author{
                _id
                profilePic
                name
        }
        }
    }
}
`;





