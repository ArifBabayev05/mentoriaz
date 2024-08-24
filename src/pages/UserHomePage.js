import React, {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    Button,
    VStack,
    HStack,
    Text,
    Heading,
    Avatar,
    IconButton,
    Spacer,
    Image,
    Progress,
    Container,
    Grid,
    GridItem,
    Link,
    Stack,
    Badge,
    InputGroup,
    InputRightElement,
    Input,
    Divider,
    useBreakpointValue
} from '@chakra-ui/react';
import {SearchIcon, BellIcon} from '@chakra-ui/icons';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
    FaBlog,
    FaMedal,
    FaStar,
    FaHome,
    FaCommentDots,
    FaHeart,
    FaCalendarAlt
} from 'react-icons/fa';

const MentorCard = ({mentor}) => {
    return (
        <RouterLink to={"/profile/"+mentor.user._id}>
            <Box bg="white" p={4} rounded="md" shadow="sm" textAlign="center">
                <Avatar src={`http://localhost:5000${mentor.photo}`} alt={mentor.name} size="xl" mb={4}/>
                <Heading as="h3" size="md" mb={2}>
                    {mentor.user.name}
                </Heading>
                <HStack spacing={2} mb={2} justifyContent="center">
                    {mentor.skills
                        ?.map((skill) => (
                            <Badge key={skill} colorScheme="blue">
                                {skill}
                            </Badge>
                        ))}
                </HStack>
                <Text fontSize="sm" color="gray.600">
                    ⭐ {mentor.sessions}
                    sessions ({mentor.reviews}
                    reviews)
                </Text>
                {mentor.newMentor && (
                    <Text fontSize="sm" mt={2} color="gray.600">
                        ⭐ New mentor
                    </Text>
                )}
            </Box>
        </RouterLink>
    )
};

const Sidebar = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async() => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`http://localhost:5000/api/profile/${userInfo._id}`);
            const data = await response.json();
            setProfile(data);
        };

        fetchProfile();
    }, []);

    return (
        <VStack align="start" spacing={4} p={4} rounded="md" w="full">
            <HStack spacing={4}>
                <Avatar
                    src={profile
                    ?.photo
                        ? `http://localhost:5000${profile.photo}`
                        : `https://cdn-icons-png.freepik.com/512/147/147142.png`}
                    name="pp"
                    size="md"/>
                <VStack align="start" spacing={1}>
                    <Heading as="h2" size="sm">
                        {profile?.user?.name}
                    </Heading>
                    <Link
                        as={RouterLink}
                        to={`/profile/${profile?.user?._id}`}
                        fontSize="sm"
                        color="gray.500">
                        Go to profile
                    </Link>
                </VStack>
            </HStack>
            <Divider/>
            <VStack align="start" spacing={2}>
                <Button as={RouterLink} to="/main" leftIcon={< FaHome />} variant="ghost">
                    Main
                </Button>
                <Button as={RouterLink} to="/message" leftIcon={< FaCommentDots />} variant="ghost">
                    Message
                </Button>
                <Button as={RouterLink} to="/meetings" leftIcon={< FaCalendarAlt />} variant="ghost">
                    My meetings
                </Button>
                <Button as={RouterLink} to="/achievements" leftIcon={< FaMedal />} variant="ghost">
                    Achievements
                </Button>
                <Button as={RouterLink} to="/favorites" leftIcon={< FaHeart />} variant="ghost">
                    Favorite
                </Button>
                <Button as={RouterLink} to="/blog" leftIcon={< FaBlog />} variant="ghost">
                    Blog
                </Button>
            </VStack>
        </VStack>
    )
};

const InfoCard = ({title, description, progress}) => (
    <Box p={4} rounded="md" shadow="sm" bg="white" w="full">
        <HStack justify="space-between">
            <VStack align="start">
                <Heading as="h4" size="md">{title}</Heading>
                <Text color="gray.500">{description}</Text>
            </VStack>
            {progress && <Progress value={progress} size="sm" colorScheme="blue" w="100px"/>}
        </HStack>
    </Box>
);

const UserHomePage = () => {
    const [mentors, setMentors] = useState([]);
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate(`/search-mentors`);
    };

    useEffect(() => {
        const fetchMentors = async() => {
            try {
                const response = await fetch('http://localhost:5000/api/mentors/all');
                const data = await response.json();
                setMentors(data);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        };

        fetchMentors();
    }, []);

    const showDesktopContent = useBreakpointValue({ base: false, lg: true });

    return (
        <Box>
            <Container maxW="8xl" mt={8}>
                <Grid templateColumns="repeat(24, 1fr)" gap={6}>
                    {showDesktopContent && (
                        <GridItem colSpan={5}>
                            <Sidebar/>
                        </GridItem>
                    )}
                    <GridItem colSpan={showDesktopContent ? 13 : 24}>
                        <VStack spacing={8}>
                            <Box shadow="sm" bg="white" p={4} rounded="md" w="full">
                                <Heading as="h3" size="lg">
                                    Fill out a form to get a list of mentors
                                </Heading>
                                <Button onClick={handleEditProfile} colorScheme="blue" mt={4}>
                                    Get new matches
                                </Button>
                            </Box>
                          
                                <VStack align="start" spacing={4} w="full">
                                    <Heading as="h3" size="lg">
                                        Recommended mentors
                                    </Heading>
                                    <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                                        {mentors.map((mentor) => (
                                            <GridItem key={mentor._id}>
                                                <MentorCard mentor={mentor}/>
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </VStack>
                            
                        </VStack>
                    </GridItem>
                    {showDesktopContent && (
                        <GridItem colSpan={6}>
                            <VStack spacing={4}>
                                <InfoCard
                                    title="Fill out your profile"
                                    description="This will help mentors get to know you better"
                                    progress={38}/>
                                <InfoCard
                                    title="Your meetings"
                                    description="You don't have any booked meetings yet"/>
                                <InfoCard
                                    title="Achievements"
                                    description="You don't have any achievements yet"/>
                            </VStack>
                        </GridItem>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default UserHomePage;
