import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import App from './App';

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql", // Update with your server's GraphQL endpoint
  headers: {
    'apollo-require-preflight': 'true', // Add this header to satisfy CSRF requirements
  },
  credentials: "include",
});

const client = new ApolloClient({
  link: uploadLink, // Use uploadLink instead of uri
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
