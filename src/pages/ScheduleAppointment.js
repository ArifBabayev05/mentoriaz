import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  VStack, 
  HStack, 
  Avatar, 
  Heading, 
  Text, 
  Button, 
  useToast, 
  Select, 
  Badge 
} from '@chakra-ui/react';
import { Calendar, DateObject } from "react-multi-date-picker";
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const ScheduleAppointment = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [date, setDate] = useState(new DateObject());
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchMentor = async () => {
      const response = await fetch(`http://localhost:5000/api/mentors/${mentorId}`);
      const data = await response.json();
      setMentor(data);
      
    };
    fetchMentor();
  }, [mentorId]);

  const scheduleAppointment = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userInfo._id, mentor: mentor.user.name, date, time }),
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

  const timeslots = ["06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM"];

  return (
    <Box w="full" maxW="7xl" mx="auto" mt="10" bg="white" p={8} rounded="lg" shadow="md">
      {mentor && (
        <HStack spacing={10} align="start">
          <VStack align="start" w="30%">
            <Avatar src={mentor?.photo ? `http://localhost:5000${mentor.photo}` : 'https://via.placeholder.com/150'} size="2xl" />
            <Heading as="h3" size="lg">
              {mentor?.user?.name}
            </Heading>
            <Text fontSize="md" color="gray.600">
              {mentor?.speciality}
            </Text>
            <Text>{mentor?.bio}</Text>
            <HStack spacing={2} mt={4}>
              <FaLinkedin size="24" />
              <FaTwitter size="24" />
              <FaGithub size="24" />
            </HStack>
            <HStack spacing={2} mt={2}>
              {mentor?.skills?.map((skill) => (
                <Badge key={skill} colorScheme="blue">
                  {skill}
                </Badge>
              ))}
            </HStack>
          </VStack>
          <VStack align="start" w="70%">
            <Heading as="h3" size="lg">
              Select a Date & Time
            </Heading>
            <Calendar
              value={date}
              onChange={setDate}
              multiple={false}
              className="custom-calendar"
            />
            <Text mt={4}>Available Time Slots</Text>
            <VStack spacing={2} align="start">
              {timeslots.map(slot => (
                <Button 
                  key={slot} 
                  onClick={() => setTime(slot)}
                  variant={time === slot ? "solid" : "outline"}
                  colorScheme={time === slot ? "teal" : "gray"}
                >
                  {slot}
                </Button>
              ))}
            </VStack>
            <Button mt={6} colorScheme="teal" onClick={scheduleAppointment}>
              Confirm
            </Button>
          </VStack>
        </HStack>
      )}
    </Box>
  );
};

export default ScheduleAppointment;
