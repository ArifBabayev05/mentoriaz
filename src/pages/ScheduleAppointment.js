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
    IconButton
} from '@chakra-ui/react';
import {Calendar} from "react-multi-date-picker";
import {FaLinkedin, FaTwitter, FaGithub, FaClock, FaUserAlt} from 'react-icons/fa';
import {useLoading} from '../helpers/loadingContext';

import '../style/meeting.css';

const ScheduleAppointment = () => {
    const {setIsLoading} = useLoading();
    const [selectedCard,
        setSelectedCard] = useState(null);

    const {mentorId} = useParams();
    const [mentor,
        setMentor] = useState(null);
    const [date,
        setDate] = useState(null);
    const [time,
        setTime] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const fetchMentor = async() => {
            const response = await fetch(`http://localhost:5000/api/mentors/${mentorId}`);
            const data = await response.json();
            setMentor(data);
        };
        fetchMentor();
    }, [mentorId]);

    const formatTime = (time) => {
        const [hours,
            minutes] = time.split(':');
        const formattedHours = hours.length === 1
            ? `0${hours}`
            : hours;
        return `${formattedHours}:${minutes}`;
    };

    const scheduleAppointment = async() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!date || !time) {
            toast({title: 'Error', description: "Please select both date and time.", status: 'error', duration: 5000, isClosable: true});
            return;
        }
        setIsLoading(true);

        const formattedDate = new Date(date.year, date.month.index, date.day);
        const [hours,
            minutes] = time.split(':');
        formattedDate.setHours(hours);
        formattedDate.setMinutes(minutes);
        const response = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userInfo._id,
                mentor: mentor.user.name,
                date: formattedDate.toLocaleDateString(),
                time: formatTime(`${formattedDate.getHours()}:${formattedDate.getMinutes()}`)
            })
        });

        if (response.ok) {
            setIsLoading(false);
            toast({title: 'Appointment scheduled.', description: "Your appointment has been scheduled successfully.", status: 'success', duration: 5000, isClosable: true});
            //navigate('/dashboard');
        } else {
            toast({title: 'Error scheduling appointment.', description: "There was an error scheduling your appointment. Please try again.", status: 'error', duration: 5000, isClosable: true});
        }
    };
    const [selectedTime,
        setSelectedTime] = useState(null);

    const handleTimeChange = (value) => {
        const formattedTime = value;
        setSelectedTime(formattedTime);
    };

    return (
        <Box
            w="full"
            maxW="7xl"
            mx="auto"
            mt="10"
            bg="white"
            p={8}
            rounded="lg"
            shadow="md">
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
                        lg: '25%'
                    }}
                        mb={{
                        base: 4,
                        md: 4,
                        lg: 0
                    }}>
                        <Avatar
                            src={mentor
                            ?.photo
                                ? `http://localhost:5000${mentor.photo}`
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
                        lg: '75%'
                    }}
                        spacing={4}>
                        <Heading as="h3" size="lg" mb={2}>
                            Select a Date & Time
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
                            </Box>

                            <Box
                                p={6}
                                bg="gray.100"
                                borderRadius="lg"
                                boxShadow="lg"
                                maxW="400px"
                                mx="auto"
                                mt={8}>
                                <Heading as="h3" size="lg" textAlign="center" mb={4} color="blue.500">Select Time</Heading>

                                <Box textAlign="center" mb={6}>
                                    <TimePicker onChange={handleTimeChange} value={selectedTime} disableClock={true} // Saat simgesini gizler
                                        format="HH:mm" // 24 saat formatı
                                        clearIcon={null} // Temizleme ikonunu gizler
                                        clockIcon={null} // Saat ikonunu gizler
                                        className="custom-time-picker" // Özel sınıf ekleyerek özelleştiriyoruz
                                    />
                                </Box>

                                {selectedTime && (
                                    <Box textAlign="center" p={4} bg="blue.100" borderRadius="md" boxShadow="md">
                                        <Text fontWeight="bold" color="blue.700">Selected Time: {selectedTime}</Text>
                                    </Box>
                                )}
                            </Box>

                            <Box flex="1">
                                <Text mt={4} fontWeight="bold">Available Cards</Text>
                                <VStack spacing={4} align="start" w="full">
                                    {mentor
                                        ?.cards
                                            ?.map(card => (
                                                <Button
                                                    key={card._id}
                                                    onClick={() => setSelectedCard(card._id)}
                                                    variant={selectedCard === card._id
                                                    ? "solid"
                                                    : "outline"}
                                                    colorScheme={selectedCard === card._id
                                                    ? "blue"
                                                    : "gray"}
                                                    w="full"
                                                    h="82px">
                                                    <Box textAlign="left" w="full">
                                                        <Text fontWeight="bold">{card.name}</Text>
                                                        <Text>{card.description}</Text>
                                                        <Text>Price: {card.price}</Text>
                                                        <Text>Time: {card.time}</Text>
                                                    </Box>
                                                </Button>
                                            ))}
                                </VStack>
                            </Box>

                        </Flex>
                        <Button mt={6} colorScheme="blue" w="full" onClick={scheduleAppointment}>
                            Confirm
                        </Button>
                    </VStack>
                </Flex>
            )}
        </Box>
    );
};

export default ScheduleAppointment;
