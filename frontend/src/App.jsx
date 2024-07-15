import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/ui/Header';
import Homepage from './pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import GridBackground from './components/ui/GridBackground';
import './App.css';
import SignUpPage from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@apollo/client';
import LoginPage from './pages/LoginPage.jsx';
import { GET_AUTHENTICATED_USER } from './graphql/queries/userQuery.js';
import SingleBlog from './pages/SingleBlog.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import MyBlogs from './pages/MyBlogs.jsx';
import EditBlogPage from './pages/EditBlogPage.jsx';
import CategoryBlogs from './pages/CategoryBlogs.jsx';
import MySavedBlogs from './pages/MySavedBlogs.jsx';
import Footer from './components/ui/Footer.jsx';

function App() {
  const { loading, data, error} = useQuery(GET_AUTHENTICATED_USER);

		if (loading) return null

if (error) return <p>Error: {error.message}</p>;
  return (
  <>
   <GridBackground>
  <Header />
  </GridBackground>
  
   
    <Routes>
        <Route path="/" element={ data.authUser? <Homepage />: <Navigate to="/login" />} />
				<Route path="/login" element={!data.authUser? <LoginPage /> : <Navigate to="/"/>} />
				<Route path="/signup" element={ !data.authUser?<SignUpPage /> : <Navigate to="/"/>} />
        <Route path='/blog/:id' element=<SingleBlog/> />
        <Route path='/create' element={data.authUser? <CreateBlog /> : <Navigate to="/login"/>} />
        <Route path='/my-blogs' element={data.authUser? <MyBlogs /> : <Navigate to="/login"/>} /> 
        <Route path='/edit-blog/:id' element={data.authUser? <EditBlogPage /> : <Navigate to="/login"/>} />
        <Route path='/category-blogs/:category' element={data.authUser? <CategoryBlogs /> : <Navigate to="/login"/>} /> 
        <Route path='/saved-blogs' element={data.authUser? <MySavedBlogs /> : <Navigate to="/login"/>} /> 
    </Routes>
    <Toaster />
    <GridBackground>
      <Footer />
    </GridBackground>
    </>
  )

}

export default App;
