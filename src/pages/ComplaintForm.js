import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';

const ComplaintForm = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const response = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userInfo._id, message }),
    });

    if (response.ok) {
      navigate('/dashboard');
    } else {
      console.error('Error submitting complaint');
    }
  };

  return (
    <Box w="md" mx="auto" mt="10">
      <form onSubmit={submitHandler}>
        <VStack spacing="4">
          <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ComplaintForm;
