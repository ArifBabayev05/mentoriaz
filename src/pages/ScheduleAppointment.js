import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';

const ScheduleAppointment = () => {
  const { mentorId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const scheduleAppointment = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userInfo._id, mentorId, date, time }),
    });

    if (response.ok) {
      toast({
        title: 'Appointment scheduled.',
        description: "Your appointment has been scheduled successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Error scheduling appointment.',
        description: "There was an error scheduling your appointment. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="md" mx="auto" mt="10">
      <form onSubmit={scheduleAppointment}>
        <VStack spacing="4">
          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          <FormControl id="time" isRequired>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Schedule
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ScheduleAppointment;
