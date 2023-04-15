import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function PaymentForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [priceId, setPriceId] = useState('price_1MxDzRD1IKeDT7PXXxAvEUY8');
    const stripe = useStripe();
    const elements = useElements();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement),
    //     });

    //     if (!error) {
    //         console.log(paymentMethod);
    //     }
    // };

    const handleCheckout = async () => {
        fetch(`/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                quantity: 1,
                productId: priceId
            })
        })
            .then(response => response.json())
            .then(data => {
                setName(data.session)
            })
            .catch(error => console.error('Error fetching data:', error))
    }

    return (
        <div>
            <input
                id='name'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                id='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => handleCheckout()}>Checkout</button>
        </div>
    );
}