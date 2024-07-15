import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations/userMutation";
import toast from 'react-hot-toast';
import { Button } from "react-bootstrap";
import RadioButton from "../components/RadioButton";
const SignUpPage = () => {
	const [signUpData, setSignUpData] = useState({
		name: "",
		email: "",
		password: "",
		gender: "",
	});

	
	const [signup, { loading }] = useMutation(SIGN_UP);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submitted');
		try {
			await signup({
				variables: {
					input: signUpData,
				},
			});
			toast.success("Successfully signed up")
		} catch (error) {
			console.error("Error:", error);
			toast.error(error.message);
		}
	};


	const handleChange = (e) => {
		const { name, value, type } = e.target;

		if (type === "radio") {
			setSignUpData((prevData) => ({
				...prevData,
				gender: value,
			}));
		} else {
			setSignUpData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	

	return (
		<div className='d-flex justify-content-center align-items-center'>
			<div className='d-flex'>
				<div className=' d-flex align-items-center justify-content-center'>
					<div className='p-5 bg-card'>
						<h1 className='fs-2 mb-2 text-black text-center'>Sign Up</h1>
						{/* <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
							Join to keep track of your expenses
						</h1> */}
						<form className='py-4 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
							<InputField
								label='Full Name'
								id='name'
								name='name'
								value={signUpData.name}
								onChange={handleChange}
							/>

							<InputField
								label='Email'
								id='email'
								name='email'
								value={signUpData.email}
								onChange={handleChange}
							/>

							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={signUpData.password}
								onChange={handleChange}
							/> 
							<div className='d-flex mt-3'>
								<RadioButton
									id='male'
									label='Male'
									name='gender'
									value='male'
									onChange={handleChange}
									checked={signUpData.gender === "male"}
								/>
								<RadioButton
									id='female'
									label='Female'
									name='gender'
									value='female'
									onChange={handleChange}
									checked={signUpData.gender === "female"}
								/>
							</div>
							

							<div>
								<Button
									type='submit'
									className=' submit-button text-white font-bold mt-5 py-2 px-5 rounded focus:outline-none focus:shadow-outline mx-auto'
									disabled={loading}
									size="lg"
								>
									{ loading? "Loading..." :"Sign Up"}
								</Button>
							</div>
						</form>
						<div className='mt-1 text-sm  text-center'>
							<p>
								Already have an account?{" "}
								<Link to='/login' className='text-black hover:underline'>
									Login here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;