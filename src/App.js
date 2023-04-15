import React, { useEffect, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './components/PaymentForm';

export default function App() {
  
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const [backendData, setBackendData] = useState([]);
  
  useEffect(() => {
    // http://54.159.163.77:8080/api
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data.users)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])
  
  return (
    <div>
      {backendData.length === 0 ? (
        <p>No data</p>
      ) : (
        <div>
          {backendData && backendData.map(function(user, index) {
            return (
              <p key={index}>{user}</p>
            )
          })}
        </div>
      )}
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  )
}
