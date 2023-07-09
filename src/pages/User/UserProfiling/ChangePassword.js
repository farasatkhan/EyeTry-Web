import React from "react";
import { FiLock } from "react-icons/fi";
import { changeUserPassword } from '../../../api/userapi';


export default function ChangePasswordScreen() {
    const [currentPassword, setCurrentPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confermPassword, setConfermPassword] = React.useState('')
    const baseURL = 'http://localhost:3000'
    // error messages
    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)


    const validateForm = () => {
        if (!currentPassword || !newPassword || !confermPassword) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields!');
            return false;
        }
        return true
    }

    const handlePassword = async () => {
        if (!validateForm()) {
            return
        }
        const passwordData = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confermPassword
        }
        try {
            const response = await changeUserPassword(passwordData)
            if (response.status == 200) {
                setSuccessMessage("Password Changed Successfully!")
                setSuccessVisible(true)
                setErrorVisible(false)
            }
        } catch (error) {
            // console.error(error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className="mb-10 flex flex-col md:flex-row md:items-center">
                        <div class="md:text-left text-center md:mb-0 mb-4">
                            <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Change Password</h3>
                            <p className=" font-sans text-base ">Update your password quickly by using current password</p>
                        </div>
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
                    <label for="password" className="block text-sm font-semibold text-gray-800 mt-10 font-sans">Current Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock color='grey' height="50" width="500" />
                        </div>
                        <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} id='currentPassword' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                    </div>
                    <label for="password" className="block text-sm font-semibold text-gray-800 mt-10 font-sans">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock color='grey' height="50" width="500" />
                        </div>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id='newPassword' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                    </div>
                    <label for="password" className="block text-sm font-semibold text-gray-800 mt-10 font-sans">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock color='grey' height="50" width="500" />
                        </div>
                        <input value={confermPassword} onChange={(e) => setConfermPassword(e.target.value)} id='confermPassword' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                    </div>


                    <div className="w-full flex items-center justify-center">
                        <div className="md:ml-auto md:text-right text-center mt-16 mb-10">
                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                            <button onClick={handlePassword} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

