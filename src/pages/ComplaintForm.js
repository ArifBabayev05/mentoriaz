import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast, Heading, Text } from '@chakra-ui/react';
import { useLoading } from '../helpers/loadingContext';
import { getApiUrl } from '../utils/apiConfig';

const ComplaintForm = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const toast = useToast();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      toast({
        title: 'Error',
        description: 'User information not found',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/complaints'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userInfo._id, message }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Complaint submitted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/user-home-page');
      } else {
        throw new Error('Failed to submit complaint');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit complaint',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      w={{ base: '90%', md: 'md' }} 
      mx="auto" 
      mt={{ base: 6, md: 10 }}
      mb={10}
      bg="white"
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      shadow="xl"
      border="1px solid"
      borderColor="gray.200">
      <VStack spacing={6} align="start" mb={6}>
        <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700">
          Contact Support
        </Heading>
        <Text color="gray.600" lineHeight="1.6">
          Have a question or concern? We're here to help. Send us a message and we'll get back to you as soon as possible.
        </Text>
      </VStack>
      <form onSubmit={submitHandler}>
        <VStack spacing={6}>
          <FormControl id="message" isRequired>
            <FormLabel fontWeight="600">Your Message</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your issue or question..."
              minH="200px"
              borderRadius="lg"
              border="2px solid"
              borderColor="gray.200"
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
              _hover={{ borderColor: 'brand.300' }}
            />
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="blue" 
            width="full"
            size="lg"
            borderRadius="xl"
            fontWeight="600"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ComplaintForm;
