import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import TimePicker from 'react-time-picker';
import {
    Box,
    VStack,
    HStack,
    Avatar,
    Heading,
    Text,
    Button,
    useToast,
    Flex,
    Badge,
    IconButton,
    Select,
    Input
} from '@chakra-ui/react';
import {Calendar} from "react-multi-date-picker";
import {FaLinkedin, FaTwitter, FaGithub, FaClock, FaUserAlt} from 'react-icons/fa';
import {useLoading} from '../helpers/loadingContext';
import { getApiUrl, getImageUrl } from '../utils/apiConfig';

import '../style/meeting.css';

const ScheduleAppointment = () => {
    const {setIsLoading} = useLoading();
    const [selectedCard,
        setSelectedCard] = useState(null);

    const {mentorId} = useParams();
    const [mentor,
        setMentor] = useState(null);
    const [meetingData,
        setMeetingData] = useState(null);
    const [date,
        setDate] = useState(null);
    const [time,
        setTime] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const fetchMentor = async() => {
            try {
                setIsLoading(true);
                const response = await fetch(getApiUrl(`/api/mentors/${mentorId}`));
                if (!response.ok) {
                    throw new Error('Failed to fetch mentor');
                }
                const data = await response.json();
                setMentor(data);
            } catch (error) {
                console.error('Error fetching mentor:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load mentor information',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchMentor();
    }, [mentorId, setIsLoading, toast]);

    const formatTime = (time) => {
        // Ensure two-digit minutes using padStart
        const [hours, minutes] = time.split(':');
        const formattedHours = hours.length === 1 ? `0${hours}` : hours;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
      };

      const scheduleAppointment = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
        if (!userInfo) {
            toast({
                title: 'Error',
                description: "User information not found",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
    
        setIsLoading(true);
    
        
    
        try {
            
            if (!date || !time || !selectedCard) {
                toast({
                    title: 'Error',
                    description: "Please select date, time, and package",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoading(false);
                return;
            }
    
            const formattedDate = new Date(date.year, date.month.index, date.day);
            const [hours, minutes] = time.split(':');
            formattedDate.setHours(hours);
            formattedDate.setMinutes(minutes);
    
            const appointmentResponse = await fetch(getApiUrl('/api/appointments'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userInfo._id,
                    mentorId: mentor.user._id,
                    date: formattedDate.toLocaleDateString(),
                    time: formatTime(`${formattedDate.getHours()}:${formattedDate.getMinutes()}`),
                    packageId: selectedCard,
                    meetingURL: null, //status update olduqda link generasya ediləcək.
                    meetingID: null
                })
            });
            if (appointmentResponse.ok) {
                toast({
                    title: 'Success!',
                    description: "Appointment request has been sent to the mentor",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/user-home-page');
            } else {
                throw new Error("Appointment creation failed");
            }
    
        } catch (error) {
            // Error handling
            toast({
                title: 'Error',
                description: "An error occurred while creating the appointment. Please try again or contact support.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            console.error('Error:', error);
        } finally {
            // Hide loading state
            setIsLoading(false);
        }
    };
    

    const timeslots = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00"

    ];

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <Box
            w="full"
            maxW="7xl"
            mx="auto"
            mt={{ base: 4, md: 10 }}
            mb={10}
            bg="white"
            p={{ base: 4, md: 8 }}
            borderRadius="2xl"
            shadow="xl"
            border="1px solid"
            borderColor="gray.200">
            {mentor && (
                <Flex
                    direction={{
                    base: 'column',
                    md: 'column',
                    lg: 'row'
                }}
                    spacing={10}
                    align="start">
                    <VStack
                        align="start"
                        w={{
                        base: 'full',
                        md: 'full',
                        lg: '30%'
                    }}
                        mb={{
                        base: 4,
                        md: 4,
                        lg: 0
                    }}>
                        <Avatar
                            src={mentor
                            ?.photo
                                ? getImageUrl(mentor.photo)
                                : 'https://via.placeholder.com/150'}
                            size="2xl"
                            mb={4}/>
                        <Heading
                            as="h3"
                            size="lg"
                            mb={2}
                            textAlign={{
                            base: 'center',
                            md: 'center',
                            lg: 'left'
                        }}>
                            {mentor
                                ?.user
                                    ?.name}
                        </Heading>
                        <Text
                            fontSize="md"
                            color="gray.600"
                            mb={4}
                            textAlign={{
                            base: 'center',
                            md: 'center',
                            lg: 'left'
                        }}>
                            {mentor
                                ?.speciality}
                        </Text>
                        <Text
                            mb={4}
                            textAlign={{
                            base: 'center',
                            md: 'center',
                            lg: 'left'
                        }}>{mentor
                                ?.bio}</Text>
                        <VStack align="start" spacing={2} w="full">
                            <HStack spacing={2}>
                                <FaClock/>
                                <Text fontSize="md">30 min</Text>
                            </HStack>
                            <HStack spacing={2}>
                                <FaUserAlt/>
                                <Text fontSize="md">Meeting details will be provided upon confirmation by {mentor
                                        ?.user
                                            ?.name}</Text>
                            </HStack>
                            <HStack spacing={2} mt={4}>
                                {mentor
                                    ?.skills
                                        ?.map((skill) => (
                                            <Badge key={skill} colorScheme="blue">
                                                {skill}
                                            </Badge>
                                        ))}
                            </HStack>
                            <HStack spacing={2} mt={4}>
                                <IconButton icon={< FaLinkedin />} isRound="true"/>
                                <IconButton icon={< FaTwitter />} isRound="true"/>
                                <IconButton icon={< FaGithub />} isRound="true"/>
                            </HStack>
                        </VStack>
                    </VStack>
                    <VStack
                        align="start"
                        w={{
                        base: 'full',
                        md: 'full',
                        lg: '70%'
                    }}
                        spacing={4}>
                        <Heading as="h3" size="lg" mb={6} fontWeight="700">
                            Select Date & Time
                        </Heading>
                        <Flex
                            w="full"
                            direction={{
                            base: "column",
                            md: "row"
                        }}>
                            <Box flex="1">

                                <Calendar
                                    value={date}
                                    onChange={setDate}
                                    multiple={false}
                                    className="custom-calendar"
                                    style={{
                                    border: 'none',
                                    width: '100%',
                                    boxShadow: 'none'
                                }}/>

                                <VStack spacing={4} justifyContent="start" mt={4}>
                                    <Input list="timeslots"
                                        placeholder="Select or enter time (HH:mm)" value={time} onChange={handleTimeChange} borderRadius="8px" border="1px solid #ccc" focusBorderColor="blue.500" size="md" width={{ base: '100%', md: '70%' }}/> {/* Datalist for predefined timeslots */}
                                    <datalist id="timeslots">
                                        {timeslots.map((slot) => (<option key={slot} value={slot}/>))}
                                    </datalist>
                                </VStack>
                            </Box>

                            <Box flex="1.5" pl={{ base: 0, md: 6 }} mt={{ base: 6, md: 0 }}>
                                <Text mt={4} mb={4} fontWeight="700" fontSize="lg">Available Packages</Text>
                                <VStack spacing={4} align="start" w="full">
                                    {mentor?.cards?.map(card => (
                                        <Button
                                            key={card._id}
                                            onClick={() => setSelectedCard(card._id)}
                                            variant={selectedCard === card._id ? "solid" : "outline"}
                                            colorScheme={selectedCard === card._id ? "blue" : "gray"}
                                            w="full"
                                            minH="100px"
                                            p={4}
                                            borderRadius="xl"
                                            border="2px solid"
                                            borderColor={selectedCard === card._id ? "brand.500" : "gray.200"}
                                            transition="all 0.3s"
                                            _hover={{
                                                transform: "translateY(-4px)",
                                                boxShadow: "lg",
                                                borderColor: "brand.400"
                                            }}>
                                            <VStack align="start" w="full" spacing={2}>
                                                <Text fontWeight="700" fontSize="md">{card.name}</Text>
                                                <Text fontSize="sm" color={selectedCard === card._id ? "white" : "gray.600"}>{card.description}</Text>
                                                <HStack spacing={4} w="full" justify="space-between">
                                                    <Text fontWeight="600" fontSize="sm">${card.price}</Text>
                                                    <Text fontSize="sm" opacity={0.8}>{card.time}</Text>
                                                </HStack>
                                            </VStack>
                                        </Button>
                                    ))}
                                </VStack>
                            </Box>

                        </Flex>
                        <Button 
                            mt={8} 
                            colorScheme="blue" 
                            w="full" 
                            size="lg"
                            borderRadius="xl"
                            fontWeight="600"
                            isDisabled={!selectedCard} 
                            onClick={scheduleAppointment}
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                            transition="all 0.2s">
                            Confirm Appointment
                        </Button>
                    </VStack>
                </Flex>
            )}
        </Box>
    );
};

export default ScheduleAppointment;
