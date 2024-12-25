import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const Payment = ({ appointmentData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Make API call to your backend to initiate payment
      const response = await axios.post('/api/payments/create', {
        amount: appointmentData.price,
        description: `Mentorship session with ${appointmentData.mentorName}`,
        currency: 'AZN'
      });

      // Redirect to GoldenPay payment page
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (err) {
      setError('Payment initialization failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Details
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            Session Details:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount: {appointmentData?.price} AZN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mentor: {appointmentData?.mentorName}
          </Typography>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayment}
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Proceed to Payment'}
        </Button>
      </Box>
    </Container>
  );
};

export default Payment;
