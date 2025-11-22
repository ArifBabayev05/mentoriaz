import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TabPanel, Text, useToast, Heading, Image, Flex, Select, Checkbox,SimpleGrid } from '@chakra-ui/react';
import images from '../helpers/imageLoader';
import axiosInstance from '../axios.config';
import { getApiUrl } from '../utils/apiConfig';

const MentorAppointments = ({ mentorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // Filter state: 'all', 'pending', 'accepted', 'declined'
  const [showPast, setShowPast] = useState(false); // State to control the toggle for past appointments
  const toast = useToast();

  useEffect(() => {
    const fetchAppointmentsAndMentor = async () => {
      try {
        const appointmentsResponse = await axiosInstance.get(`/api/appointments/${mentorId}`);
        const appointmentsData = appointmentsResponse.data;

        if (Array.isArray(appointmentsData)) {
          setAppointments(appointmentsData);
        } else {
          setAppointments([appointmentsData]);
        }

        const mentorResponse = await axiosInstance.get(`/api/mentors/${mentorId}`);
        setMentor(mentorResponse.data);
      } catch (error) {
        console.error("Error fetching appointments or mentor data:", error);
        toast({
          title: 'Xəta',
          description: 'Məlumatlar yüklənə bilmədi',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchAppointmentsAndMentor();
  }, [mentorId, toast]);

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

    let meetingData = null;

    try {
      if (newStatus === '1') {
        const startDate = new Date().toISOString();
        const endDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();

        const meetingResponse = await fetch(getApiUrl('/create-meeting'), {
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

      const response = await axiosInstance.put(`/api/appointments/update/${appointmentId}`, {
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

  const handleFilterChange = () => {
    let filteredAppointments = appointments;

    // Filter by status
    if (filter !== 'all') {
      filteredAppointments = filteredAppointments.filter((appointment) => appointment.isAccepted === filter);
    }

    // Show only future appointments if 'showPast' is unchecked
    if (!showPast) {
      const currentDate = new Date().toISOString();
      filteredAppointments = filteredAppointments.filter((appointment) => new Date(appointment.date) >= new Date(currentDate));
    }

    return filteredAppointments;
  };

  const filteredAppointments = handleFilterChange();

  return (
    <TabPanel>
      <Box w="100%" mx="auto">
        <Flex justify="flex-start" mb={4} gap={4}>
          <Select onChange={(e) => setFilter(e.target.value)} value={filter} width="200px">
            <option value="all">All</option>
            <option value="2">Pending</option>
            <option value="1">Accepted</option>
            <option value="0">Declined</option>
          </Select>
          <Checkbox 
            isChecked={showPast} 
            onChange={() => setShowPast(!showPast)} 
          >
            Show past appointments
          </Checkbox>
        </Flex>
  
        {/* Show message if no appointments match the filter */}
        {filteredAppointments.length === 0 ? (
          <>
            <Heading textAlign="center" size="lg" fontWeight="700">
              No appointments found
            </Heading>
            <Box
              mx="auto"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image w="30%" src={images['nf.png']} />
            </Box>
          </>
        ) : (
          // Render filtered appointments
          <Flex wrap="wrap" justify="center" gap={4}>
            {filteredAppointments.map((appointment) => (
              <Box
                key={appointment._id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                my={4}
                bg="white"
                boxShadow="lg"
                maxWidth="sm"
                d="flex"
                _hover={{ boxShadow: '2xl', transform: 'scale(1.02)' }}
                transition="all 0.3s"
                width={['100%', '48%', '30%']} // Ensures responsive layout
              >
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Appointment Details
                </Text>
                <Flex direction="column" gap={2} mb={4}>
                  <Text>
                    <strong>Date:</strong> {appointment.date}
                  </Text>
                  <Text>
                    <strong>Time:</strong> {appointment.time}
                  </Text>
                  <Text>
                    <strong>Status:</strong> {appointment.isAccepted === '1' ? 'Accepted' : appointment.isAccepted === '0' ? 'Declined' : 'Pending'}
                  </Text>
                  <Text>
                    <strong>Package:</strong> {findPackageNameById(appointment.packageId)}
                  </Text>
                </Flex>
  
                <Flex justifyContent="space-between" wrap="wrap" gap={4}>
                  {appointment.isAccepted === '2' ? (
                    <>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment._id, '1')}
                        isLoading={isLoading}
                        width={['100%', '48%']}
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment._id, '0')}
                        isLoading={isLoading}
                        width={['100%', '48%']}
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    appointment.isAccepted === '1' && appointment.meetingURL ? (
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => window.open(appointment.meetingURL, '_blank')}
                        width="100%"
                      >
                        Join Meeting
                      </Button>
                    ) : null
                  )}
                </Flex>
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </TabPanel>
  );
  
  
  
};

export default MentorAppointments;
