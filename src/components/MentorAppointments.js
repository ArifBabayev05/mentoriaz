import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TabPanel, Text, useToast } from '@chakra-ui/react';

const MentorAppointments = ({ mentorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchAppointmentsAndMentor = async () => {
      try {
        const appointmentsResponse = await axios.get(`http://localhost:5000/api/appointments/${mentorId}`);
        const appointmentsData = appointmentsResponse.data;

        console.log(appointmentsData);
        if (Array.isArray(appointmentsData)) {
          setAppointments(appointmentsData);
        } else {
          setAppointments([appointmentsData]);
        }

        const mentorResponse = await axios.get(`http://localhost:5000/api/mentors/${mentorId}`);
        setMentor(mentorResponse.data);
      } catch (error) {
        console.error("Error fetching appointments or mentor data:", error);
      }
    };

    fetchAppointmentsAndMentor();
  }, [mentorId]);

  const findPackageNameById = (packageId) => {
    if (mentor && mentor.cards) {
      const card = mentor.cards.find((card) => card._id === packageId);
      return card ? card.name : 'Package not found';
    }
    return 'Package not found';
  };

  // Function to update the appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    setIsLoading(true); // Start loading

    try {
      let meetingData = null;

      // If accepted (status 1), create a meeting
      if (newStatus === '1') {
        const startDate = new Date().toISOString();
        const endDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();

        const meetingResponse = await fetch('http://localhost:5000/create-meeting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
          }),
        });

        if (!meetingResponse.ok) throw new Error("Meeting creation failed");

        meetingData = await meetingResponse.json();

        if (!meetingData || !meetingData.roomUrl || !meetingData.meetingId) {
          toast({
            title: 'Error',
            description: 'Meeting data not found, please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
      }

      const response = await axios.put(`http://localhost:5000/api/appointments/update/${appointmentId}`, {
        isAccepted: newStatus,
        meetingURL: meetingData ? meetingData.roomUrl : null,
        meetingID: meetingData ? meetingData.meetingId : null,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, isAccepted: newStatus, meetingURL: meetingData ? meetingData.roomUrl : null, meetingID: meetingData ? meetingData.meetingId : null }
            : appointment
        )
      );

      console.log("Appointment updated:", response.data);

      if (newStatus === '0') {
        console.log('Email sent for declined appointment.');
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast({
        title: 'Error',
        description: 'Something went wrong while updating the appointment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabPanel>
      <Box w="100%" mx="auto">
        {appointments?.some(appointment => appointment.isAccepted === '2') ? ( // Check if there are appointments with status '2'
          appointments?.filter(appointment => appointment.isAccepted === '2').map((appointment) => ( // Filter appointments with status '2'
            <Box key={appointment._id} borderWidth="0px" borderRadius="lg" p={4} my={2}>
              <Text>Date: {appointment.date}</Text>
              <Text>Time: {appointment.time}</Text>
              <Text>Status: {appointment.isAccepted}</Text>
              <Text>Package: {findPackageNameById(appointment.packageId)}</Text>    
              <Button
                colorScheme="green"
                onClick={() => updateAppointmentStatus(appointment._id, '1')} 
                mr={2}
                isLoading={isLoading}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                onClick={() => updateAppointmentStatus(appointment._id, '0')} 
                isLoading={isLoading}
              >
                Decline
              </Button>
            </Box>
          ))
        ) : (
          <Text>No appointment requests at the moment</Text> 
        )}
      </Box>
    </TabPanel>
  );
};

export default MentorAppointments;
