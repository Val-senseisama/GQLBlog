// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {  EDIT_USER } from '../graphql/mutations/userMutation';
import toast from 'react-hot-toast';
import { GET_AUTHENTICATED_USER } from '../graphql/queries/userQuery';
import { Button, Container } from 'react-bootstrap';
import InputField from '../components/InputField';
import { UPLOAD_IMAGE } from '../graphql/mutations/blogMutation';

const MyProfile = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);
  const [editUser] = useMutation(EDIT_USER);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    profilePic: '',
    email: ''
  });

  useEffect(() => {
    if (data) {
      const { name, email, profilePic } = data.authUser;
      setFormData({ name, email, profilePic, password: '' });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { data } = await uploadImage({ variables: { file } });
      const newImageUrl = data.uploadImage;
      setFormData({ ...formData, profilePic: newImageUrl });
    } catch (error) {
      console.error('Error uploading image:', error.message);
      toast.error('Error uploading image');
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser({ variables: { input: formData } });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Error updating profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
         <div className="profile-page h-80vh px-3">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <InputField type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <InputField type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <InputField type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Picture:</label>
          <InputField type="file" name="profilePic" onChange={handleImageUpload} />
          {formData.profilePic && <img src={formData.profilePic} alt="Profile" width={100} />}
        </div>
        <Button
									type='submit'
									className=' submit-button text-white font-bold mt-5 py-2 px-5 rounded focus:outline-none focus:shadow-outline mx-auto'
									disabled={loading}
									size="lg"
								>
									{ loading? "Loading..." :"Save Changes"}
								</Button>
      </form>
    </div>

    </Container>
   
  );
};

export default MyProfile;
