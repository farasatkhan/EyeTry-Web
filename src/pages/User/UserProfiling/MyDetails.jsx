import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaUser, } from "react-icons/fa";
import { getUserData, updatePersonalInfo } from '../../../api/userapi';
import { viewProfileImage, deleteProfileImage } from '../../../api/userapi';
import defaultImage from '../../../assets/images/UserProfiling/pfpdefault.png';


export default function MyDetailsScreen() {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [profilePic, setProfilePic] = React.useState(null)
    const baseURL = 'http://localhost:3000'

        // error messages
        const [errorVisible,setErrorVisible] = React.useState(false)
        const [errorMsg,setErrorMsg] = React.useState('')
        const [successVisible,setSuccessVisible] = React.useState(false)
        const [successMessage,setSuccessMessage] = React.useState(null)

    // getting profile image
    React.useEffect(() => {

        const getImage = async () => {
            try {
                const img = await viewProfileImage();
                setProfilePic(baseURL + img.location)
            }
            catch (e) {
                if (e.response.status == 403) {
                    console.log('Refreshing Token Failed')
                }
                if (e.response.status == 400) {
                    console.log('No Image is present')
                    setProfilePic(null)
                }
                // console.error(e) // annoying
                console.log(e)
            }
        }

        getImage();
    }, [])

    // deleting profile pic
    // delete address
    const deleteProfilePic = async (id) => {
        try {
            await deleteProfileImage()
            setProfilePic(defaultImage)
        }
        catch (e) {
            throw e
        }
    }

    React.useEffect(() => {
        getProfileData()
    }, [])

    const getProfileData = async () => {
        try {
            const response = await getUserData()
            setFirstName(response.firstName)
            setLastName(response.lastName)
            setEmail(response.email)
        }
        catch (e) {
            throw e
        }
    }

    // update personal info

    // form validation 
    const validateForm = () => {
        if (!firstName || !lastName || !email) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }
    const handlePersonalInfo = async () => {
        if (!validateForm()) {
            return
        }
        const personalData = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        try {
            const response = await updatePersonalInfo(personalData)
            if (response.status == 200) {
                setSuccessMessage("Personal Info Updated Successfully!")
                setSuccessVisible(true)
                setErrorVisible(false)
                localStorage.setItem("firstName", firstName)
                localStorage.setItem("lastName", lastName)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className="mb-10 flex flex-col md:flex-row md:items-center">
                        <div class="md:text-left text-center md:mb-0 mb-4">
                            <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Personal Information</h3>
                            <p className=" font-sans text-base ">Edit your profile quickly</p>
                        </div>
                        {errorVisible &&
                            <p style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingBottom: '2%' }}>
                                {errorMsg}
                            </p>
                        }
                        {successVisible &&
                            <p style={{ color: 'green', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', paddingBottom: '2%' }}>
                                {successMessage}
                            </p>
                        }
                        <div className="md:ml-auto md:text-right text-center">
                            <Link to='/user/delete_account'><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Delete Account</button></Link>
                            <Link to='/user/change_password'><button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Change Password</button></Link>
                        </div>
                    </div>


                    <label for="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                    </div>

                    <label for="lastname" className="block text-sm mt-10 font-semibold text-gray-800 font-sans">Last Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                    </div>

                    <label for="email" className="block text-sm mt-10 font-semibold text-gray-800 font-sans">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope color='grey' />
                        </div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email" />
                    </div>

                    <div className=" bg-white border border-gray-200 rounded-lg shadow mt-10  mx-auto mb-10">
                        <div className="flex flex-row mt-5">
                            <h4 class=" ml-5  text-lg font-bold tracking-tight text-gray-900 font-sans">Your Photo</h4>
                        </div>
                        <hr class="border-3 border-gray-300 my-4" />
                        <div className="p-5">
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div style={{ width: 70, height: 70, borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={profilePic} alt="logo" className='w-full h-full ' />
                                </div>
                                <h2 style={{ fontWeight: 700, fontSize: 18, marginTop: 10, marginBottom: 20, marginLeft: 15 }}>{localStorage.getItem("firstName")}
                                 {localStorage.getItem("lastName")} <span className="flex flex-row space-x-5" ><p onClick={deleteProfilePic} 
                                 className=" text-red-700 font-sans font-medium cursor-pointer" >Delete</p> <Link to='/user/upload_user_image'><p 
                                 className="text-blue-700 font-sans font-medium" >Update</p></Link></span>   </h2>
                            </div>

                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button onClick={handlePersonalInfo} type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10">Save</button>
                    </div>
                </div>
            </div>
        </div>


    );
}

