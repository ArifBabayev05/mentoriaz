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
            const response = await fetch(`http://localhost:5000/api/mentors/${mentorId}`);
            const data = await response.json();
            setMentor(data);
        };
        fetchMentor();
    }, [mentorId]);

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
                title: 'Xəta',
                description: "İstifadəçi məlumatları tapılmadı",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
    
        setIsLoading(true);
    
        const startDate = new Date().toISOString(); 
        const endDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    
        try {
            const meetingResponse = await fetch('http://localhost:5000/create-meeting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    start_date: startDate,
                    end_date: endDate

                })
            });
    
            // if (!meetingResponse.ok) throw new Error("Meeting creation failed");
    
            // const meetingData = await meetingResponse.json();
            // setMeetingData(meetingData);
    
            // if (!meetingData || !meetingData.roomUrl || !meetingData.meetingId) {
            //     toast({
            //         title: 'Xəta',
            //         description: 'Görüş məlumatları tapılmadı, lütfən yenidən cəhd edin.',
            //         status: 'error',
            //         duration: 5000,
            //         isClosable: true,
            //     });
            //     setIsLoading(false);
            //     return;
            // }
            if (!date || !time || !selectedCard) {
                toast({
                    title: 'Xəta',
                    description: "Tarix, gün və paket seçilməlidir",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    color: "white"
                });
                setIsLoading(false);
                return;
            }
    
            const formattedDate = new Date(date.year, date.month.index, date.day);
            const [hours, minutes] = time.split(':');
            formattedDate.setHours(hours);
            formattedDate.setMinutes(minutes);
    
            const appointmentResponse = await fetch('http://localhost:5000/api/appointments', {
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
                    title: 'Görüş istəyi yaradıldı.',
                    description: "Görüşmə istəyi mentor'a göndərildi",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/dashboard');
            } else {
                throw new Error("Appointment creation failed");
            }
    
        } catch (error) {
            // Error handling
            toast({
                title: 'Xəta baş verdi',
                description: "Görüşmə yaradılan zaman xəta yarandı, yenidən cəhd edin və ya dəstək komandasına bildirin.",
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
                        lg: '70%'
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

                                <VStack spacing={4} justifyContent="start" display="inline">
                                    <Input list="timeslots"
                                        placeholder="Select or enter time (HH:mm)" value={time} onChange={handleTimeChange} borderRadius="8px" border="1px solid #ccc" focusBorderColor="blue.500" size="md" width="70%"/> {/* Datalist for predefined timeslots */}
                                    <datalist id="timeslots">
                                        {timeslots.map((slot) => (<option key={slot} value={slot}/>))}
                                    </datalist>
                                </VStack>
                            </Box>

                            <Box flex="1.5">
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
                        <Button mt={6} colorScheme="blue" w="full" isDisabled={!selectedCard} onClick={scheduleAppointment}>
                            Confirm
                        </Button>
                    </VStack>
                </Flex>
            )}
        </Box>
    );
};

export default ScheduleAppointment;
