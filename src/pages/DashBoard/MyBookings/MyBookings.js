import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const MyBookings = () => {
    const booking = useLoaderData()
    const { price, treatment, slot } = booking
    // console.log(email)
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
    return (
        <div>
            <h1 className='text-3xl'>Payment for {treatment}</h1>
            <h1 className='text-xl'>Please Pay <strong>${price}</strong> for your appointment at {slot}</h1>
            <div className=' my-7'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default MyBookings;