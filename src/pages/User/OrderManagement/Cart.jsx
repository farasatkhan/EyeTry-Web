// CartComponent.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getUserData, deleteAddress, viewAllPayments, deletePaymentMethod } from '../../../api/userapi';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEnvelope, FaUser, } from "react-icons/fa";
import API_URL from '../../../config/config';

const Cart = () => {

  // getting payment and address data
  const [addresses, setAddresses] = React.useState([])
  const [payments, setPayments] = useState([])
  const [isDeleted, setDeleted] = useState(false)
  // getting address book
  React.useEffect(() => {
    getProfileData()
    getPaymentData()
  }, [])

  const getProfileData = async () => {
    try {
      const response = await getUserData()
      setAddresses(response.addressBook)
      // setFirstName(response.firstName)
      // setLastName(response.lastName)
      // setEmail(response.email)
    }
    catch (e) {
      throw e
    }
  }

  // delete address
  const deleteSpecificAddress = async (id) => {
    try {
      await deleteAddress(id)
      getProfileData()
    }
    catch (e) {
      throw e
    }
  }

  // getting payment data 
  const getPaymentData = async () => {
    try {
      const response = await viewAllPayments()
      setPayments(response)
    }
    catch (e) {
      throw e
    }
  }

  // delete Payment
  const deleteSpecificPayment = async (id) => {
    try {
      await deletePaymentMethod(id)
      getPaymentData()
    }
    catch (e) {
      throw e
    }
  }

  //     //  table content 
  const [activeTab, setActiveTab] = useState('paymentMethod');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  // const selectedOptions = useSelector((state) => state.selectedOptions);

  // // Convert the selectedOptions object to a JSON string with pretty formatting
  // const selectedOptionsJSON = JSON.stringify(selectedOptions, null, 2);

  // getting localstorage cart items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getLocalStorageCartItems();
  }, []);

  const getLocalStorageCartItems = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart'));
    setCartItems(storedCartItems);
    console.log("cart screen data", storedCartItems);
  }


  // managing payment method
  const paymentRoute = payments.length > 0 ? `/user/edit_payment/${payments[0]._id}` : '/user/add_payment';
  const paymentBtnText = payments.length > 0 ? 'Edit' : 'Add Payment Method';

  // managing shipping address
  const addressRoute = addresses.length > 0 ? `/user/edit_address/${addresses[0]._id}` : '/user/add_address';
  const addressBtnText = addresses.length > 0 ? 'Edit' : 'Add Shipment Address';

  // handleIncrement
  const [counter, setCounter] = useState(1)
  const handleIncrement = () => {
    setCounter(counter + 1)
  }

  const [productData, setProductData] = useState({});

  useEffect(() => {
    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }
    console.log("product data", JSON.stringify(productData, null, 2));
  }, []);


  // handle decrement
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }


  // Define a state to store quantities for each product
  const [productQuantities, setProductQuantities] = useState({});

  // ... (other code)

  // Function to handle incrementing the quantity
  const handleIncrementQuantity = (productId) => {
    const updatedQuantities = { ...productQuantities };
    if (updatedQuantities[productId] < availableQuantity) {
      updatedQuantities[productId]++;
    } else {
      // Show an alert if quantity exceeds available quantity
      alert('Quantity cannot exceed available quantity.');
    }
    setProductQuantities(updatedQuantities);
  };

  // Function to handle decrementing the quantity
  const handleDecrementQuantity = (productId) => {
    const updatedQuantities = { ...productQuantities };
    if (updatedQuantities[productId] > 1) {
      updatedQuantities[productId]--;
    }
    setProductQuantities(updatedQuantities);
  };

  // Function to calculate the total price based on quantities
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const productId in productQuantities) {
      const productQuantity = productQuantities[productId];
      const product = cartItems.find((item) => item.productData._id === productId);
      if (product) {
        const productPrice = product.productData.priceInfo.price;
        totalPrice += productPrice * productQuantity;
      }
    }
    return totalPrice;
  };


  return (

    <div>
      <div>
        <div className="cart">
          <h2>Your Cart</h2>
          <div>
            {/* Map through cartItems and render each item */}
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <p>Quantity: {item.orderSelections.selectedOptions.lensProperties.lensType}</p>
                {/* Render other details from item.productData and item.orderSelections */}
              </div>
            ))}
          </div>
        </div>
        {/* ... (other code) */}
      </div>
      <div class="min-h-screen bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div class="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => (
              <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  className="w-full rounded-lg sm:w-40"
                  src={API_URL + item.productData.frame_information.frame_variants[0].images[0]}
                  alt={`Product ${index}`}

                />
                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">{item.productData.name}</h2>
                    <p class="mt-1 text-xs text-gray-700">36EU - 4US</p>
                  </div>
                  <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                      <span onClick={() => handleDecrementQuantity(item.productData._id)} class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                      <input value={counter} class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" min="1" />
                      <span onClick={() => handleIncrementQuantity(item.productData._id)} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                    </div>
                    <div class="flex items-center space-x-4">
                      <p class="text-sm">{item.productData.priceInfo.price} - {item.productData.priceInfo.currency}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Subtotal</p>
              <p class="text-gray-700">${calculateTotalPrice().toFixed(2)}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-gray-700">Shipping</p>
              <p class="text-gray-700">$4.99</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
              <p class="mb-1 text-lg font-bold">${(calculateTotalPrice() + 4.99).toFixed(2)} USD</p>
                <p class="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </div>
        </div>

        {/* payment and address method */}
        {/* table tabs content */}
        <div className="bg-gray-200 mt-20 p-10 pl-36 font-sans mb-10 rounded-sm mx-auto w-[95%]">
          {/* Tab buttons */}
          <div className="flex mb-4 space-x-4">
            <button
              className={` text-lg tab-btn ${activeTab === 'paymentMethod' ? 'text-blue-400 border-b-[3px] border-blue-500' : ''}`}
              onClick={() => handleTabClick('paymentMethod')}
            >
              Payment Method
            </button>
            <button
              className={`text-lg tab-btn ${activeTab === 'shippingAddress' ? 'text-blue-400 border-b-[3px] border-blue-500' : ''}`}
              onClick={() => handleTabClick('shippingAddress')}
            >
              Shipping Address
            </button>
            <button
              className={`text-lg tab-btn ${activeTab === 'Coupen' ? 'text-blue-400 border-b-[3px] border-blue-500' : ''}`}
              onClick={() => handleTabClick('Coupen')}
            >
              Coupen
            </button>
          </div>

          {/* Tab contents */}
          <div
            className="border p-4 h-[200px] overflow-y-auto"
            id="tab-content-container"
          >
            <div
              className={`tab-content ${activeTab === 'paymentMethod' ? '' : 'hidden'}`}
              id="description-tab"
            >
              <h5 className="font-semibold text-black">
                {payments.length > 0 ? payments[0].nameOnCard : "No Payment Method"}
              </h5>
              <p className="text-base font-sans">
                {payments.length > 0 ? (
                  <>
                    VISA&nbsp;&nbsp;{payments[0].paymentType}&nbsp;&nbsp;
                    <br />
                    Expiration Date: {payments[0].expirationMonth}/{payments[0].expirationYear}&nbsp;&nbsp;
                    <br />
                    Address: {payments[0].billingInfo.address}
                  </>
                ) : (
                  "No Payment Method added!"
                )}
              </p>

              <div class=" py-4 text-right">
                <Link to={paymentRoute} state={{ from: '/user/cart' }} >
                  <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                    <BiEdit size={20} class="mr-2" />
                    <span>{paymentBtnText}</span>
                  </button>
                </Link>
                {payments.length > 0 &&
                  <button onClick={() => deleteSpecificPayment(payments[0]._id)} class="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                                 hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                    <MdDelete size={20} class="mr-2" />
                    <span>Delete</span>
                  </button>
                }
              </div>

            </div>
            {/* for shipment address */}
            <div
              className={`tab-content ${activeTab === 'shippingAddress' ? '' : 'hidden'}`}
              id="description-tab"
            >
              <h5 className="font-semibold text-black">
                {addresses.length > 0 ? "This is your default delivery address" : "No Shipping Address Added!"}
              </h5>
              <p className="text-base font-sans">
                {addresses.length > 0 ? (
                  <>
                    <h5 className="font-semibold text-black mb-2">{addresses.firstName}</h5>
                    <p className="text-base font-sans">{addresses[0].currentAddress}, {addresses[0].city}, {addresses[0].zipCode},</p>
                    <p>{addresses[0].country},</p>
                    <p>{addresses[0].phone}</p>

                  </>
                ) : (
                  "No Shipping Address Added!"
                )}
              </p>
              <div class=" py-4 text-right">
                <Link to={addressRoute} state={{ from: '/user/cart' }} >
                  <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                    <BiEdit size={20} class="mr-2" />
                    <span>{addressBtnText}</span>
                  </button>
                </Link>
                {addresses.length > 0 &&
                  <button onClick={() => deleteSpecificAddress(addresses[0]._id)} class="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                                 hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                    <MdDelete size={20} class="mr-2" />
                    <span>Delete</span>
                  </button>
                }
              </div>

            </div>

            <div
              className={`tab-content ${activeTab === 'Coupen' ? '' : 'hidden'}`}
              id="frame-tab"
            >
              <h1 className="text-base font-semibold">No Coupen Added!</h1>
              <table className="text-md font-semibold">
                {/* Frame and Measurements Content */}
              </table>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
export default Cart;