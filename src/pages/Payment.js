import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // YOUR_STRIPE_PUBLIC_KEY ile kendi Stripe Public Key'inizi değiştirin

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setError(null);
          alert('Payment successful!');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="4">
        <FormControl id="amount" isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>

        <FormControl id="card" isRequired>
          <FormLabel>Card Details</FormLabel>
          <CardElement />
        </FormControl>

        {error && <Box color="red.500">{error}</Box>}

        <Button type="submit" colorScheme="teal" width="full" disabled={!stripe}>
          Pay
        </Button>
      </VStack>
    </form>
  );
};

const Payment = () => {
  return (
    <Box w="md" mx="auto" mt="10">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Box>
  );
};

export default Payment;
