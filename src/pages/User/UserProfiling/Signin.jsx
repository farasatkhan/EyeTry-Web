import React from 'react';
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link, Navigate } from 'react-router-dom';
import { signInUser } from '../../../api/authapi';
import { useNavigate } from 'react-router-dom';
import signinImg from '../../../assets/images/UserProfiling/signin.png';


function Signin() {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')

    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
        setChecked(!checked);
    };

    const validateForm = () => {
        // Validating user input
        if (!email || !password) {
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
        return true
    }

    const handleSignIn = async (event) => {
        
        event.preventDefault();
        if (!validateForm()) {
            return
        }
        try {
            const response = await signInUser(email, password);
            const { user, accessToken, refreshToken } = response.data
            console.log("Access Token", accessToken)
            console.log("Refresf Token", refreshToken)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            navigate('/'); // Replace '/' with the desired URL

        }
        catch (error) {
            console.log(error.response.data.message);
            setErrorVisible(true);
            setErrorMsg(error.response.data.message);
            // throw error
        }
    }



    return (
        <div className="">
            <div className="flex flex-row items-center flex-1 h-full justify-center px-4 sm:px-0">
                {/* left side */}
                <div className="hidden md:block w-1/2 h-screen" >
                    <img src={signinImg} alt="logo" className='w-full h-full object-cover' />
                </div>
                {/* right side */}
                <div className="flex flex-col h-screen w-full md:w-1/2 p-4 overflow-y-auto ">
                    <div className="flex flex-col w-4/5 mx-auto flex-1 items-center justify-center ">
                        <h1 className='font-sans font-bold text-3xl mx-auto  mb-5' >Sign In!</h1>


                        {errorVisible &&
                            <p style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingBottom: '4%' }}>
                                {errorMsg}
                            </p>
                        }

                        <form onSubmit={handleSignIn} className="mt-6 w-[90%] mx-auto">

                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 font-sans">Email</label>
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

                            <label htmlFor="keep-signed-in" className="inline-flex items-center mt-7">
                                <input value={checked} checked onChange={handleCheckBoxChange} type="checkbox" id="keep-signed-in" name="keep-signed-in" className="form-checkbox w-4 h-4 text-indigo-600" />
                                <span className="ml-2 text-sm  text-gray-500 font-sans">Keep me signed in</span>
                            </label>

                            <div className="mt-8 ">
                                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:bg-black">Login</button>
                            </div>

                            <div className='mt-5 text-right'>
                                <Link to="/ForgotPassword" className=" text-[15px] text-[#1C9CEA] hover:underline font-sans">Forgot Password?</Link>
                            </div>
                        </form>

                        <div className="relative flex items-center justify-center w-full mt-10 mb-8 border border-t xl:w-4/5 mx-auto">
                            <div className="absolute px-5 text-sm bg-white font-sans">Sign In With</div>
                        </div>

                        <div className="flex space-x-2 w-[70%] h-[35px]">
                            <button
                                type="button"
                                className="flex items-center justify-center bg-[#4064AC] w-full p-2  rounded-md focus:ring-2 ">
                                <FaFacebookF size={20} color='white' />
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center bg-[#1C9CEA] w-full p-2 rounded-md focus:ring-2 ">
                                <FaTwitter size={22} color='white' />
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center bg-[#D64937] w-full p-2 rounded-md focus:ring-2 ">
                                <FaGoogle size={20} color='white' />
                            </button>

                        </div>

                        <p className="mt-8 text-base font-sans text-center text-gray-700">Don't have an account?
                            <Link to="/signup" className="font-medium text-[#3ba0e8] hover:underline"> Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signin;

