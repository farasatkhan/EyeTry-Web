// CartComponent.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserData, deleteAddress, viewAllPayments, deletePaymentMethod } from '../../../api/userapi';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import API_URL from '../../../config/config';
import { checkout } from '../../../api/productsApi';

const Cart = () => {

  // getting payment and address data
  const [addresses, setAddresses] = React.useState([])
  const [payments, setPayments] = useState([])
  const [uid, setUid] = useState(null)
  const [isDeleted, setDeleted] = useState(false)
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [hasShippingAddress, setHasShippingAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('paymentMethod');
  const [productQuantities, setProductQuantities] = useState({});
  const [productData, setProductData] = useState({});


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

  }

  useEffect(() => {
    const initialProductQuantities = {};
    for (const item of cartItems) {
      // Initialize the quantity based on the available quantity of the variant
      const variantId = item.productData.frame_information.frame_variants.find(
        (variant) =>
          variant.color === item.orderSelections.selectedOptions.frameProperties.frameColor
      )._id;

      initialProductQuantities[`${item.productData._id}_${variantId}`] = 1;
    }
    setProductQuantities(initialProductQuantities);
  }, [cartItems]);
  

  const placeOrder = async () => {
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
              color: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.color,
              transitionType: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.sunglassesType,
            },
            sunglassesLens: {
              color: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.color,
              sunglassesType: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.sunglassesType,
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
        totalPrice: (calculateTotalPrice() + 4.99).toFixed(2),
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
  
      console.log("OrderData: ", order);
  
      try {
        const response = await checkout(order); // Sending the entire order as one request
        console.log("Order Placed Successfully!", response.data);
        alert("Order Placed Successfully!")
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
  const handleIncrementQuantity = (productId, variantId) => {
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
          `Product: ${productId}, Variant: ${variantId}, Available Quantity: ${availableQuantity}`
        );

        if (updatedQuantities[`${productId}_${variantId}`] < availableQuantity) {
          updatedQuantities[`${productId}_${variantId}`]++;
          setProductQuantities(updatedQuantities); // Update the state
        } else {
          // Show an alert if quantity exceeds available quantity
          alert('Quantity cannot exceed available quantity.');
        }
      }
    }
  };


  // Function to handle decrementing the quantity
  const handleDecrementQuantity = (productId, variantId) => {
    const updatedQuantities = { ...productQuantities };
    if (updatedQuantities[`${productId}_${variantId}`] > 1) {
      updatedQuantities[`${productId}_${variantId}`]--;
      setProductQuantities(updatedQuantities); // Update the state
    }
  };


  const calculateTotalPrice = () => {
    let totalCalculatedPrice = 0;

    for (const productId in productQuantities) {
      const keyParts = productId.split('_');
      if (keyParts.length === 2) {
        const product = cartItems.find(
          (item) =>
            item.productData._id === keyParts[0] &&
            item.productData.frame_information.frame_variants.some(
              (variant) => variant._id === keyParts[1]
            )
        );

        if (product) {
          const productPrice = product.productData.priceInfo.price;
          totalCalculatedPrice = totalCalculatedPrice += productPrice * productQuantities[productId];
        }
      }
    }
    
    return totalCalculatedPrice;
  };

  const removeFromCart = (productId, variantId) => {
    // Filter out the item to be removed from the cartItems state
    const updatedCartItems = cartItems.filter((item) => {
      const sameProductId = item.productData._id === productId;
      const sameVariantId = item.productData.frame_information.frame_variants.some(
        (variant) => variant._id === variantId
      );
      return !(sameProductId && sameVariantId);
    });
  
    // Update the cartItems state
    setCartItems(updatedCartItems);
  
    // Update the local storage to reflect the changes
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };
  

  return (

    <div>

      <div className="min-h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems && cartItems.length > 0 ?
              (
                cartItems.map((item, index) => (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">

                    <img
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
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{item.productData.name}</h2>
                        {/* <p className="mt-1 text-xs text-gray-700">Available Quantity: {item.productData.frame_information.frame_variants.quastity}</p> */}
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button onClick={() => handleDecrementQuantity(item.productData._id,
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
                              ._id)}
                          >-
                          </button>

                          <span>{productQuantities[`${item.productData._id}_${item
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
                            ._id}`]}
                          </span>

                          <button onClick={
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
                                ._id
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
                                )._id
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
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${(calculateTotalPrice() + 4.99).toFixed(2)} USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button onClick={placeOrder} disabled={(cartItems && cartItems.length < 1)} className={`cursor-pointer mt-6 w-full
             rounded-md ${cartItems && cartItems.length < 1  ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}  py-1.5 font-medium text-blue-50
               `}>Check out</button>
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
              <h5 className="font-semibold text-black">
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