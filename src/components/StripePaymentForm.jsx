import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id to your server
      const response = await fetch('/api/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: amount * 100, // Stripe expects amount in cents
        }),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result);
      } else {
        console.error(result.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="mt-4 bg-primary text-white rounded-xl px-4 py-2 font-semibold">
        Pay with Stripe
      </button>
    </form>
  );
};

export default StripePaymentForm;