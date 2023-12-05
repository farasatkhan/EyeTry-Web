// CartComponent.js

import React, { useState, useEffect } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import { getUserData, deleteAddress, viewAllPayments, deletePaymentMethod } from '../../../api/userapi';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import API_URL from '../../../config/config';
import { checkout, getGiftcart } from '../../../api/productsApi';
import { processPayment } from '../../../api/productsApi';
import axios from '../../../api/axiosConfig';
import Modal from "react-modal";
import stripeLogo from '../../../assets/images/orders/stripeLogo.png'
import { useSelector, useDispatch } from "react-redux";
import { updatedCartItemsNumber } from '../../../redux/actions/cartItemsNumber';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Cart = () => {

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // getting payment and address data
  const [addresses, setAddresses] = React.useState([])
  const [payments, setPayments] = useState([])
  const [uid, setUid] = useState(null)
  const [isDeleted, setDeleted] = useState(false)
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [hasShippingAddress, setHasShippingAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('shippingAddress');
  const [productQuantities, setProductQuantities] = useState({});
  const [productData, setProductData] = useState({});
  const [shippingPrice, setShippingPrice] = useState(4.99);
  const [userName, setUserName] = useState('')

  const dispatch = useDispatch();

  dispatch(updatedCartItemsNumber(cartItems.length));


  // getting address book
  useEffect(() => {
    getProfileData()
    getPaymentData()
  }, [])

  const getProfileData = async () => {
    try {
      const response = await getUserData()
      setAddresses(response.addressBook)
      setUid(response._id)
      setHasShippingAddress(response.addressBook.length > 0);
      setUserName(`${response.firstName} ${response.lastName}`)
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
      setHasPaymentMethod(response.length > 0);
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


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // getting localstorage cart items

  useEffect(() => {
    getLocalStorageCartItems();
  }, []);


  const getLocalStorageCartItems = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart'));
    setCartItems(storedCartItems);
    console.log("cart screen data", storedCartItems);
    if (storedCartItems.length === 0) {
      setShippingPrice(0)
      setDiscount(0)
    }
  }

  useEffect(() => {
    const initialProductQuantities = {};
    for (const item of cartItems) {
      // Initialize the quantity based on the available quantity of the variant
      const variantId = item.productData.frame_information.frame_variants.find(
        (variant) =>
          variant.color === item.orderSelections.selectedOptions.frameProperties.frameColor
      )._id;

      initialProductQuantities[`${item.productData._id}_${variantId}_${item.orderSelections.selectedOptions.cartItemId}`] = 1;
    }
    setProductQuantities(initialProductQuantities);
  }, [cartItems]);


  const placeOrder = async (event) => {

    // Handling payment
    event.preventDefault();

    // Assuming 'stripe' and 'elements' are properly set up
    openModal();

    if (!stripe || !elements) {
      // Stripe not yet loaded
      return;
    }

    try {
      const { data } = await axios.post(
        "payment/process_payment",
        {
          amount: (calculateTotalPrice() + shippingPrice).toFixed(2),
          // Add any other required data here
        }
      );

      const client_secret = data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userName,
          },
        },
      });

      if (result.error) {
        // Handle payment error
        console.error(result.error.message);
        alert(result.error.message)
        return;

      } else {
        // Payment successful, you can send the paymentMethod to your server if necessary
        const paymentMethod = result.paymentIntent.payment_method;
        console.log("Payment Successful! " + " amount: " + calculateTotalPrice())
        closeModal();
      }
    } catch (error) {
      console.error(error);
      alert("payment Unseccessful!")
      return;
    }

    if (hasPaymentMethod && hasShippingAddress) {
      // Construct the items array by mapping over the cartItems
      const items = cartItems.map((item, index) => {
        return {
          frame: item.productData._id,
          quantity: Object.values(productQuantities)[index],
          frameProperties: {
            frameSize: item.orderSelections.selectedOptions.frameProperties.frameSize,
            frameColor: item.orderSelections.selectedOptions.frameProperties.frameColor,
          },
          lensProperties: {
            lensType: item.orderSelections.selectedOptions.lensProperties.lensType,
            prescriptionType: item.orderSelections.selectedOptions.lensProperties.prescriptionType,
            package: item.orderSelections.selectedOptions.lensProperties.package,
            coatings: item.orderSelections.selectedOptions.lensProperties.coatings,
            glassesType: item.orderSelections.selectedOptions.lensProperties.glassesType,
            upgrades: item.orderSelections.selectedOptions.lensProperties.upgrades,
            transitionLens: {
              transitionType: item.orderSelections.selectedOptions.lensProperties.transitionLens.transitionType,
              color: item.orderSelections.selectedOptions.lensProperties.transitionLens.transitionColor,
            },
            sunglassesLens: {
              sunglassesType: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.sunglassesType,
              color: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.color,
            },
          },
          prescription: {
            pdType: item.orderSelections.selectedOptions.prescription.pdType,
            pdOneNumber: item.orderSelections.selectedOptions.prescription.pdOneNumber,
            pdLeftNumber: item.orderSelections.selectedOptions.prescription.pdLeftNumber,
            pdRightNumber: item.orderSelections.selectedOptions.prescription.pdRightNumber,
            birthYear: item.orderSelections.selectedOptions.prescription.birthYear,
            leftEyeOS: {
              Axis: item.orderSelections.selectedOptions.prescription.leftEyeOS.Axis,
              Base: item.orderSelections.selectedOptions.prescription.leftEyeOS.Base,
              CYL: item.orderSelections.selectedOptions.prescription.leftEyeOS.CYL,
              Prism: item.orderSelections.selectedOptions.prescription.leftEyeOS.Prism,
              SPH: item.orderSelections.selectedOptions.prescription.leftEyeOS.SPH,
            },
            rightEyeOD: {
              Axis: item.orderSelections.selectedOptions.prescription.rightEyeOD.Axis,
              Base: item.orderSelections.selectedOptions.prescription.rightEyeOD.Base,
              CYL: item.orderSelections.selectedOptions.prescription.rightEyeOD.CYL,
              Prism: item.orderSelections.selectedOptions.prescription.rightEyeOD.Prism,
              SPH: item.orderSelections.selectedOptions.prescription.rightEyeOD.SPH,
            },
          },
        };
      });

      // Create the order object with items and totalPrice
      const order = {
        user: uid,
        items: items,
        totalPrice: (calculateTotalPrice() + shippingPrice).toFixed(2),
        paymentMethod: payments[0]._id,
        shippingAddress: {
          name: addresses[0].firstName,
          phone: addresses[0].phone,
          address: addresses[0].currentAddress,
          city: addresses[0].city,
          country: addresses[0].country,
          zipCode: addresses[0].zipCode,
        },
      };

      console.log("Order sent Data: ", order);

      try {
        const response = await checkout(order); // Sending the entire order as one request
        console.log("Order Placed Successfully!", response.data);
        alert("Order Placed Successfully!")
        setDiscount(0)
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Add Payment Method and Shipping Address First!");
    }
  };


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


  useEffect(() => {
    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }
    console.log("product data", JSON.stringify(productData, null, 2));
  }, []);


  // Function to handle incrementing the quantity
  const handleIncrementQuantity = (productId, variantId, cartItemId) => {
    const updatedQuantities = { ...productQuantities };
    const product = cartItems.find(
      (item) =>
        item.productData._id === productId &&
        item.productData.frame_information.frame_variants.some(
          (variant) => variant._id === variantId
        )
    );

    if (product) {
      const selectedVariant = product.productData.frame_information.frame_variants.find(
        (variant) => variant._id === variantId
      );

      if (selectedVariant) {
        const availableQuantity = selectedVariant.quantity;

        console.log(
          `Product: ${productId}, Variant: ${variantId}, cartItemId: ${cartItemId}, Available Quantity: ${availableQuantity}`
        );

        if (updatedQuantities[`${productId}_${variantId}_${cartItemId}`] < availableQuantity) {
          updatedQuantities[`${productId}_${variantId}_${cartItemId}`]++;
          setProductQuantities(updatedQuantities); // Update the state
        } else {
          // Show an alert if quantity exceeds available quantity
          alert('Quantity cannot exceed available quantity.');
        }
      }
    }
  };


  // Function to handle decrementing the quantity
  const handleDecrementQuantity = (productId, variantId, cartItemId) => {
    const updatedQuantities = { ...productQuantities };
    if (updatedQuantities[`${productId}_${variantId}_${cartItemId}`] > 1) {
      updatedQuantities[`${productId}_${variantId}_${cartItemId}`]--;
      setProductQuantities(updatedQuantities); // Update the state
    }
  };


  const calculateTotalPrice = () => {
    let totalCalculatedPrice = 0;

    for (const productId in productQuantities) {
      const keyParts = productId.split('_');
      if (keyParts.length === 3) {
        const product = cartItems.find(
          (item) =>
            item.productData._id === keyParts[0] &&
            item.productData.frame_information.frame_variants.some(
              (variant) => variant._id === keyParts[1]
            ) &&
            item.orderSelections.selectedOptions.cartItemId == keyParts[2]
        );

        if (product) {
          const productPrice = product.productData.priceInfo.price;
          totalCalculatedPrice = totalCalculatedPrice += productPrice * productQuantities[productId];
        }
      }
    }

    return totalCalculatedPrice;
  };

  const removeFromCart = (productId, variantId, cartItemId) => {
    // Filter out the item to be removed from the cartItems state
    const updatedCartItems = cartItems.filter((item) => {
      const sameProductId = item.productData._id === productId;
      const sameCartItemId = item.orderSelections.selectedOptions.cartItemId === cartItemId;
      const sameVariantId = item.productData.frame_information.frame_variants.some(
        (variant) => variant._id === variantId
      );
      return !(sameProductId && sameVariantId && sameCartItemId);
    });

    // Update the cartItems state
    setCartItems(updatedCartItems);
    getLocalStorageCartItems();
    // Update the local storage to reflect the changes
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  // getting giftcards
  const [coupen, setCoupen] = useState("")
  const [discount, setDiscount] = useState(0)

  const getGiftcardsData = async (coupen) => {
    if (discount === 0) {
      try {
        const response = await getGiftcart(coupen);
        console.log(response);

        // Check if the gift card has expired
        if (response.message && response.message.includes("expired")) {
          alert("The gift card has expired!");
        } else {
          alert(`Congrats! ${response.giftcard.value}% discount added to your purchase.`);
          setDiscount(response.giftcard.value);
        }
      } catch (error) {
        console.log(error);
        alert("Error occurred while processing the gift card.");
      }
    } else {
      alert("Coupon is invalid or already used!");
    }
  }


  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const cardElementStyle = {
    base: {
      fontSize: '18px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      // border: '1px solid black', 
    },
    invalid: {
      color: 'red',
    },
  };

  const cardElementOptions = {
    style: cardElementStyle,
  };
  return (

    <div>
      <div className="min-h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-3xl font-mono font-bold text-gray-600">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems && cartItems.length > 0 ?
              (
                cartItems.map((item, index) => (
                  <div className="justify-between mb-6 rounded-lg bg-white cursor-pointer p-6 shadow-md sm:flex sm:justify-start">

                    <img
                      onClick={() => navigate(`/product_details/${item.productData._id}`)}
                      className="w-full rounded-lg sm:w-40"
                      src={
                        API_URL
                        + item
                          .productData
                          .frame_information
                          .frame_variants
                          .find((v) => v
                            .color
                            ===
                            item
                              .orderSelections
                              .selectedOptions
                              .frameProperties
                              .frameColor)
                          .images[0]
                      }
                      alt={`Product ${index}`}
                    />

                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div onClick={() => navigate(`/product_details/${item.productData._id}`)} className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-600">{item.productData.name}</h2>
                        <p className=' text-sm mt-2'><span className='text-blue-900 font-semibold'>Frame:</span> {item.orderSelections.selectedOptions.frameProperties.frameColor}, {item.orderSelections.selectedOptions.frameProperties.frameSize}</p>
                        <p className=' text-sm'><span className=' text-blue-900 font-semibold'>Lens:</span> {item.orderSelections.selectedOptions.lensProperties.glassesType}, {item.orderSelections.selectedOptions.lensProperties.lensType}, {item.orderSelections.selectedOptions.lensProperties.package}, {item.orderSelections.selectedOptions.lensProperties.prescriptionType}</p>
                        {/* <p className="mt-1 text-xs text-gray-700">Available Quantity: {item.productData.frame_information.frame_variants.quastity}</p> */}
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        {/* <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                          <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                          <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                        </div> */}

                        <div className="flex items-center border-gray-100">
                          <button className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
                            onClick={() => handleDecrementQuantity(
                              item.productData._id,
                              item
                                .productData
                                .frame_information
                                .frame_variants
                                .find((v) => v
                                  .color
                                  ===
                                  item
                                    .orderSelections
                                    .selectedOptions
                                    .frameProperties
                                    .frameColor)
                                ._id,
                              item.orderSelections.selectedOptions.cartItemId
                            )
                            }
                          >-
                          </button>

                          <div className='h-8 border bg-white text-center text-xs outline-none'
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <input
                              type="number"
                              value={productQuantities[`${item.productData._id}_${item.productData.frame_information
                                .frame_variants.find((v) => v.color === item.orderSelections.selectedOptions
                                  .frameProperties.frameColor)._id}_${item.orderSelections.selectedOptions.cartItemId}`]}
                              min="1"
                              readOnly
                              style={{ marginLeft: 12, border: 'none', width: 40, background: 'none', outline: 'none', textAlign: 'center', fontSize: '14px' }}
                            />
                          </div>


                          <button className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50' onClick={
                            () => handleIncrementQuantity(
                              item
                                .productData
                                ._id
                              ,
                              item
                                .productData
                                .frame_information
                                .frame_variants
                                .find((v) => v
                                  .color
                                  ===
                                  item
                                    .orderSelections
                                    .selectedOptions
                                    .frameProperties
                                    .frameColor)
                                ._id,
                              item.orderSelections.selectedOptions.cartItemId
                            )}
                          >+</button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{item.productData.priceInfo.price} - {item.productData.priceInfo.currency}</p>
                          <div
                            onClick={() =>
                              removeFromCart(
                                item.productData._id,
                                item.productData.frame_information.frame_variants.find(
                                  (v) =>
                                    v.color ===
                                    item.orderSelections.selectedOptions.frameProperties.frameColor
                                )._id,
                                item.orderSelections.selectedOptions.cartItemId
                              )
                            }
                            className='cross'
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center font-sans text-2xl">Cart is empty</div>
              )}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${calculateTotalPrice().toFixed(2)}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">${shippingPrice}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Giftcard Discount</p>
              <p className="text-gray-700">{discount}%</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Amount Decreased</p>
              <p className="text-gray-700">${(((calculateTotalPrice() + shippingPrice).toFixed()) * discount) / 100}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${(calculateTotalPrice() + shippingPrice).toFixed(2) - ((((calculateTotalPrice() + shippingPrice).toFixed(2)) * discount) / 100)} USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button onClick={openModal} disabled={(cartItems && cartItems.length < 1)} className={`cursor-pointer mt-6 w-full
             rounded-md ${cartItems && cartItems.length < 1 ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}  py-1.5 font-medium text-blue-50
               `}>Check out</button>
          </div>
        </div>

        {/* payment and address method */}
        {/* table tabs content */}
        <div className="bg-gray-200 mt-20 p-10 pl-36 font-sans mb-10 rounded-sm mx-auto w-[95%]">
          {/* Tab buttons */}
          <div className="flex mb-4 space-x-4">
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
              Gift Card
            </button>
          </div>

          {/* Tab contents */}
          <div
            className="border p-4 h-[300px] overflow-y-auto"
            id="tab-content-container"
          >
            <div
              className={`tab-content ${activeTab === 'paymentMethod' ? '' : 'hidden'}`}
              id="description-tab"
            >

              <div>
                {/* Modal for card elements */}
                <div className='relative'>
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Card Modal"
                    style={{
                      content: {
                        width: '400px', // Adjust the width as needed
                        height: '500px', // Adjust the height as needed
                        margin: 'auto', // Center the modal horizontally
                      },
                    }}
                  >
                    {/* <h2 className='' style={{ textAlign: 'center', fontFamily: 'sans-serif' , fontSize: 24, fontWeight:'bold', color: "#5B63FF" }}>Enter Card Details</h2> */}
                    <div className='  '>
                      <img src={stripeLogo} className='w-full h-20 object-contain mb-10' alt='' />

                      <div style={{ marginBottom: '16px', border: '2px solid #00308F', padding: 8, borderRadius: 5 }}>
                        <CardNumberElement options={cardElementOptions} />
                      </div>


                      <div style={{ marginBottom: '16px', border: '2px solid #00308F', padding: 8, borderRadius: 5 }}>
                        <CardExpiryElement options={cardElementOptions} />
                      </div>

                      <div style={{ marginBottom: '16px', border: '2px solid #00308F', padding: 8, borderRadius: 5 }}>
                        <CardCvcElement options={cardElementOptions} />
                      </div>
                    </div>
                    <div>
                    </div>

                    <div className=' absolute w-[90%] mx-auto bottom-10 flex flex-col justify-center items-center '>
                      <button className="py-2 w-[80%] mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mb-3" onClick={(event) => placeOrder(event)}>Pay</button>
                      <button className="py-2 w-[80%] mx-auto bg-gray-800 rounded-lg text-white" onClick={closeModal}>Close</button>
                    </div>
                  </Modal>
                </div>
              </div>

              <div className=" py-4 text-right">
                <Link to={paymentRoute} state={{ from: '/user/cart' }} >
                  <button className="py-1 px-4 rounded inline-flex items-center ml-auto
                    bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                  hover:text-white border border-blue-500 hover:border-transparent 
                  justify-end mr-5">
                    <BiEdit size={20} className="mr-2" />
                    <span>{paymentBtnText}</span>
                  </button>
                </Link>
                {payments.length > 0 &&
                  <button onClick={() => deleteSpecificPayment(payments[0]._id)}
                    className="py-1 px-4 rounded inline-flex items-center ml-auto
                    bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                    hover:text-white border border-red-500 hover:border-transparent 
                    justify-end mr-5">
                    <MdDelete size={20} className="mr-2" />
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
              {/* <h5 className="font-semibold text-black">
                {addresses.length > 0 ? "This is your default delivery address" : "No Shipping Address Added!"}
              </h5>
              <p className="text-base font-sans">
                {addresses.length > 0 ? (
                  <>
                    <h5 className="font-semibold text-black mb-2">{addresses[0].firstName}</h5>
                    <p className="text-base font-sans">{addresses[0].currentAddress}, {addresses[0].city}, {addresses[0].zipCode},</p>
                    <p>{addresses[0].country},</p>
                    <p>{addresses[0].phone}</p>

                  </>
                ) : (
                  "No Shipping Address Added!"
                )}
              </p>
              <div className=" py-4 text-right">
                <Link to={addressRoute} state={{ from: '/user/cart' }} >
                  <button className="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                    <BiEdit size={20} className="mr-2" />
                    <span>{addressBtnText}</span>
                  </button>
                </Link>
                {addresses.length > 0 &&
                  <button onClick={() => deleteSpecificAddress(addresses[0]._id)} className="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                                 hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                    <MdDelete size={20} className="mr-2" />
                    <span>Delete</span>
                  </button>
                }
              </div> */}

              <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                  <div className="left-0 pl-3 flex items-center pointer-events-none">
                    <BiEdit size={30} className="mr-5 pb-1" />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">Address Book</h2>
                  </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {
                      addresses.length !== 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">

                          <tbody>

                            <tr className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4 text-base font-sans">
                                <h5 className="font-bold text-black mb-2">{addresses[0].firstName}</h5>
                                <p className="font-semibold text-base font-sans">This is your default delivery address</p>
                                <p className="text-base font-sans">
                                  {addresses[0].currentAddress}, {addresses[0].city}, {addresses[0].zipCode}, {addresses[0].country},
                                  {addresses[0].phone}
                                </p>
                              </td>
                              <td className="py-4 text-right">
                                <Link state={{ from: '/cart' }} to={`/user/edit_address/${addresses[0]._id}`}>
                                  <button className="py-1 px-4 rounded inline-flex items-center ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                    <BiEdit size={20} className="mr-2" />
                                    <span>Edit</span>
                                  </button>
                                </Link>
                                <button onClick={() => deleteSpecificAddress(addresses[0]._id)} className="py-1 px-4 rounded inline-flex items-center ml-auto bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                  <MdDelete size={20} className="mr-2" />
                                  <span>Delete</span>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div>
                          <p className="font-sans text-base font-semibold p-2 py-3 ml-2">Address Not Added Yet</p>
                        </div>
                      )
                    }
                    {
                      addresses.length > 0 ? (
                        <></>
                      ) : (
                    <div className=" py-4 text-right">
                      <Link to={addressRoute} state={{ from: '/user/cart' }} >
                        <button className="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                          <BiEdit size={20} className="mr-2" />
                          <span>{addressBtnText}</span>
                        </button>
                      </Link>
                      {addresses.length > 0 &&
                        <button onClick={() => deleteSpecificAddress(addresses[0]._id)} className="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                                 hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                          <MdDelete size={20} className="mr-2" />
                          <span>Delete</span>
                        </button>
                      }
                    </div>
                      )
                    }
                  </div>
                </div>
              </div>

            </div>

            <div
              className={`tab-content ${activeTab === 'Coupen' ? '' : 'hidden'}`}
              id="frame-tab"
            >
              <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                  <div className="left-0 pl-3 flex items-center pointer-events-none">
                    <BiEdit size={30} className="mr-5 pb-1" />
                  </div>
                  <div class="flex items-center justify-between w-full">
                    <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900">Giftcard / Add Coupen</h2>
                    {/* <Link to='/user/giftcards'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Buy Gift Cards</span>
                        </button></Link> */}
                  </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">

                  <p className="text-base font-sans mb-5">To get discount on the purchase, enter your card number or store credit</p>

                  <span className="flex flex-row">
                    <input value={coupen} onChange={e => setCoupen(e.target.value)} id='' className="block w-full sm:w-[80%] lg:w-[50%] pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Gift Card/Store Credit number" type="text" />
                    <button
                      onClick={() => getGiftcardsData(coupen)}
                      disabled={cartItems.length === 0}
                      className={`ml-5 px-4 rounded inline-flex items-center 
                        ${cartItems.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent'}`}
                    >
                      <span>Submit</span>
                    </button>

                  </span>


                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart;