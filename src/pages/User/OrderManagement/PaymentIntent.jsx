import React, { useState } from 'react';
import { useEffect } from 'react';
import { getStripeApiKey } from '../../../api/productsApi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



const CheckoutForm = () => {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(()  =>  {
    getStripeApiKeyData()
  },[])

  const getStripeApiKeyData = async () => {
    const {data} = await getStripeApiKey()
    setStripeApiKey(data.stripeApiKey)
    console.log(data.stripeApiKey)
  }

  const stripePromise = loadStripe(stripeApiKey);


  const [paymentAmount, setPaymentAmount] = useState(1000); // Amount in cents

  const handlePayment = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;
    const { error, paymentMethod } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
    } else {
      // Payment succeeded, handle success
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <label>
        Payment Amount: <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
      </label>
      {/* <CardElement /> */}
      <button type="submit">Pay Now</button>
    </form>
  );
};


export default CheckoutForm;