import React, { useState } from 'react';
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { registerUser } from '../../api/authapi';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
        setChecked(!checked);
    };

    // Form Validation
    const validateForm = () => {
        // Validating user input
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorVisible(true)
            setErrorMsg('Please enter a valid email address.');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorVisible(true)
            setErrorMsg('Passwords do not match');
            return false;
        }
        if (!checked) {
            setErrorVisible(true)
            setErrorMsg('Please agree to terms and conditions');
            return false;
        }
        return true
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return
        }
        // ApI Request const { user, accessToken, refreshToken,message }
        try {
            const response = await registerUser(firstName, lastName, email, password, confirmPassword);

            const { user, accessToken, refreshToken } = response.data

            // Saving to local storage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            console.log(user)
            console.log(accessToken)
            console.log(refreshToken)
            navigate('/signin');
        }
        catch (error) {
            console.error(error.response.status)
            if (error.response.status == 400) {
                console.log("You May navigate to signin")
            }
            setErrorVisible(true)
            setErrorMsg(error.response.data.message)
            throw error
        }
    };



    return (
        <div className="h-screen">
            <div className="flex flex-row items-center flex-1 h-full justify-center px-4 sm:px-0">
                <div className="hidden md:block h-full min-h-screen  w-1/2 " >
                    <img src={require('../../assets/images/signin.png')} alt="logo" className='w-full h-full object-cover' />
                </div>

                <div className="flex flex-col h-full w-full md:w-1/2 p-4 overflow-y-scroll">
                    <div className="flex flex-col w-4/5 mx-auto flex-1 justify-center mb-8">
                        <h1 className='font-sans font-bold text-4xl mx-auto mb-3 mt-2' >Sign Up!</h1>

                        {errorVisible &&
                            <p style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', padding: '4%' }}>
                                {errorMsg}
                            </p>
                        }

                        <form onSubmit={handleSignUp} className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                            </div>

                            <label htmlFor="lastname" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Last Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                            </div>

                            <label htmlFor="email" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaRegEnvelope color='grey' />
                                </div>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email" />
                            </div>

                            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mt-5 font-sans">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock color='grey' height="50" width="500" />
                                </div>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                            </div>

                            <label htmlFor="confermpass" className="block text-sm font-semibold text-gray-800 mt-5 font-sans">Conferm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock color='grey' height="50" width="500" />
                                </div>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id='confermpass' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                            </div>

                            <label htmlFor="keep-signed-in" className="inline-flex items-center mt-6">
                                <input value={checked} onChange={handleCheckBoxChange} type="checkbox" id="keep-signed-in" name="keep-signed-in" className="form-checkbox w-4 h-4 text-indigo-600" />
                                <span className="ml-2 text-sm text-gray-500 font-sans">Agree with <span className='text-[#1C9CEA] hover:underline'>Terms and Conditions</span> </span>
                            </label>

                            {/* <Link to="/signin"> */}
                            <div className="mt-12 ">
                                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform
                             bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:bg-black">Sign Up</button>
                            </div>
                            {/* </Link> */}
                        </form>

                        <div className="relative flex items-center justify-center w-full mt-14 mb-5 border border-t sm:w-4/5  mx-auto">
                            <div className="absolute px-5 text-sm bg-white font-sans">Sign In With</div>
                        </div>

                        <div className="flex mt-5 gap-x-3 sm:w-4/5 mx-auto w-full">
                            <button
                                type="button"
                                className="flex items-center justify-center bg-[#4064AC] w-full p-2  rounded-md focus:ring-2 ">
                                <FaFacebookF size={23} color='white' />
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center bg-[#1C9CEA] w-full p-2 rounded-md focus:ring-2 ">
                                <FaTwitter size={23} color='white' />
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center bg-[#D64937] w-full p-2 rounded-md focus:ring-2 ">
                                <FaGoogle size={23} color='white' />
                            </button>

                        </div>

                        <p className="mt-12 text-base font-sans text-center text-gray-700">Already a member?
                            <Link to="/signin" className="font-medium font-sans text-[#3ba0e8] hover:underline"> Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signup;

