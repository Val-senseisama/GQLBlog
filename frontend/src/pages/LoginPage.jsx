import React, { useState } from 'react'
import { LOGIN } from '../graphql/mutations/userMutation';
import { useMutation } from '@apollo/client';
import InputField from '../components/InputField';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const [login , {loading}] = useMutation(LOGIN,  {
		refetchQueries:["GetAuthenticatedUser"]
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		if(!loginData.email || !loginData.password) return toast.error("Please fill all fields")
		try {
			await login({variables: { input: loginData}});
		} catch (error) {
			console.log("Error loggin in", error);
			toast.error(error.message)
		}
	};
  return (
    <div className='h-80vh'>
      <div className='d-flex justify-content-center align-items-center'>
			<div className='d-flex'>
				<div className=' d-flex align-items-center justify-content-center'>
					<div className='p-5 bg-card'>
						<h1 className='fs-2 mb-2 text-black text-center'>Login</h1>
						{/* <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
							Join to keep track of your expenses
						</h1> */}
						<form className='py-4 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
							<InputField
								label='Email'
								id='email'
								name='email'
								value={loginData.email}
								onChange={handleChange}
							/>
							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={loginData.password}
								onChange={handleChange}
							/> 
							<div>
								<Button
									type='submit'
									className=' submit-button text-white font-bold mt-5 py-2 px-5 rounded focus:outline-none focus:shadow-outline mx-auto'
									disabled={loading}
									size="lg"
								>
									{ loading? "Loading..." :"Login"}
								</Button>
							</div>
						</form>
						{/* <div className='mt-1 text-sm  text-center'>
							<p>
								Already have an account?{" "}
								<Link to='/login' className='text-black hover:underline'>
									Login here
								</Link>
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default LoginPage
