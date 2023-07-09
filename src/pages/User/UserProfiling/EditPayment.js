import React, { Alert } from "react";
import {  useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { updatePaymentMethod, viewSpecificPaymentMethod } from '../../../api/userapi'

// for date picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function AddPaymentScreen() {
    const {id} = useParams();
    const [paymentType, setPaymentType] = React.useState('')
    const [nameOnCard, setNameOnCard] = React.useState('')
    const [cardNumber, setCardNumber] = React.useState('')
    const [cvv, setCvv] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [city, setCity] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [state, setState] = React.useState('')
    const [zipCode, setZipCode] = React.useState('')
    // for date picker
    const [expirationMonth, setExpirationMonth] = React.useState(dayjs('01'));
    const [expirationYear, setExpirationYear] = React.useState(dayjs('2023'));



    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)

    // Fetching Payment Data
    React.useEffect(()=>{
        const setData = async()=>{
            console.log("check useeffect")
            try{
                const payment = await viewSpecificPaymentMethod(id);
                setPaymentType(payment.paymentType)
                setNameOnCard(payment.nameOnCard)
                setCardNumber(payment.cardNumber)
                setCvv(payment.cvv)
                setFirstName(payment.billingInfo.firstName)
                setLastName(payment.billingInfo.lastName)
                setCountry(payment.billingInfo.country)
                setCity(payment.billingInfo.city)
                setAddress(payment.billingInfo.address)
                setZipCode(payment.billingInfo.zipCode)
                setState(payment.billingInfo.state)
                setExpirationMonth(payment.expirationMonth.month)
                setExpirationYear(payment.expirationYear.year)
            }
            catch(e){
                throw e
            }
        }
        setData()
    },[])


    // form validation 
    const validateForm = () => {
        if (!country || !city || !zipCode || !firstName || !lastName || !address || !paymentType
            || !nameOnCard || !cardNumber  || !cvv || !state) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }

    const savePaymentMethod = async () => {
        if (!validateForm()) {
            return
        }
        const paymentMethodData = {
            paymentType: paymentType,
            nameOnCard: nameOnCard,
            cardNumber: cardNumber,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            cvv: cvv,
            firstName: firstName,
            lastName: lastName,
            country: country,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
        }
        console.log("paymentMethodData", paymentMethodData)
        try {
            const response = await updatePaymentMethod(paymentMethodData, id)
            console.log("Response inside comp", response)
            if (response.status == 200) {
                setSuccessMessage("Payment Method Updated Successfully!")
                setSuccessVisible(true)
                setErrorVisible(false)
                Alert("Information Saved!")
            }
        }
        catch (e) {
            console.error(e)
        }
        // clearing all fields after adding a new address
        setNameOnCard('')
        setCardNumber('')
        setExpirationMonth('')
        setExpirationYear('')
        setCvv('')
        setFirstName('')
        setLastName('')
        setCountry('')
        setAddress('')
        setState('')
        setZipCode('')
        setCity('')
    }



    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">


                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div class=" text-center md:mb-0 mb-4 mx-auto">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Edit Payment Method</h3>
                        <p className=" font-sans text-base mt-3">Select Your Payment Method</p>
                    </div>

                    <div className="mt-10 justify-center p-10 flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-0 sm:space-x-5 py-16 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img src={require('../../../assets/images/UserProfiling/stripe.png')} alt="logo" className='w-50 h-50 ' />
                        <img src={require('../../../assets/images/UserProfiling/paypal.png')} alt="logo" className='w-50 h-50 ' />
                    </div>

                    <div className="relative flex items-center justify-center w-full mt-14  border border-t sm:w-4/5  mx-auto">
                        <div className="absolute px-5 text-sm bg-white font-sans">OR</div>
                    </div>

                    <div className="mt-6 flex justify-center ">
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
                    </div>


                    <p className="font-sans text-lg font-bold mt-10">Credit Card Information</p>
                    <div className="flex flex-row space-x-4 mt-10">
                        <div className="relative mt-5 flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser color='grey' />
                            </div>
                            <input value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Legal Name on Credit Card" type="text" />
                        </div>

                        <div className=" mt-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Card Number" type="number" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4 mt-10">
                        <div className="flex-grow">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={cvv} onChange={(e) => setCvv(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="CVV" type="number" />
                            </div>
                        </div>

                        {/* Month picker */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                                <DatePicker
                                    views={['month']}
                                    label="Expiry Month"
                                    value={expirationMonth}
                                    onChange={(newValue) => setExpirationMonth(newValue)}
                                />
                            </DemoContainer>

                        </LocalizationProvider>

                        {/* date picker */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                                <DatePicker
                                    views={['year']}
                                    label="Expiry Year"
                                    value={expirationYear}
                                    onChange={(newValue) => setExpirationYear(newValue)}
                                />
                            </DemoContainer>

                        </LocalizationProvider>
                    </div>

                    <p className="font-sans text-lg font-bold mt-20">Billing Address</p>

                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className=" mt-10 block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Last Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                            </div>
                        </div>
                    </div>

                    <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Address</label>
                    <div className="relative ">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Apartment, Suite, etc (optional)" type="text" />
                    </div>


                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className=" mt-10 block text-sm font-semibold text-gray-800 font-sans">City</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={city} onChange={(e) => setCity(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your City" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Postal Code</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Postal Code" type="number" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">State</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={state} onChange={(e) => setState(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your State" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Country</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={country} onChange={(e) => setCountry(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Country" type="tel" />
                            </div>
                        </div>
                    </div>


                    <div className="md:ml-auto md:text-right text-center mt-20">
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                        <button onClick={savePaymentMethod} type="button" class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

