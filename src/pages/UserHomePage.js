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
import axios from "axios";
import { useLoading } from '../helpers/loadingContext';
import axiosInstance from '../axios.config';
import { getApiUrl, getImageUrl } from '../utils/apiConfig';

const MentorCard = ({ mentor }) => {
    const [reviewsCount, setReviewsCount] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axiosInstance.get(`/api/reviews/${mentor.user._id}`);
            const reviews = response.data;
            const count = reviews.filter(review => review.mentor === mentor.user._id).length;
            setReviewsCount(count);
          } catch (error) {
            console.error("Error fetching reviews:", error);
          }
        };
    
        fetchReviews();
      }, [mentor.user._id]);

    return (
        <RouterLink to={"/profile/" + mentor.user._id}>
            <Box 
                bg="white" 
                p={6} 
                borderRadius="2xl" 
                shadow="sm" 
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
                transition="all 0.3s"
                _hover={{ 
                    shadow: "xl", 
                    transform: "translateY(-8px)",
                    borderColor: "brand.200"
                }}
                cursor="pointer"
                h="full">
                <Avatar 
                    src={getImageUrl(mentor.photo)} 
                    alt={mentor.name} 
                    size="xl" 
                    mb={4}
                    border="3px solid"
                    borderColor="brand.100"
                />
                <Heading as="h3" size="md" mb={2} fontWeight="700">
                    {mentor.user.name}
                </Heading>
                <Badge 
                    colorScheme="gray" 
                    mb={3}
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="600">
                    {mentor.specialty}
                </Badge>
                <HStack spacing={2} mb={3} justifyContent="center" flexWrap="wrap">
                    {mentor.skills?.slice(0, 3).map((skill) => (
                        <Badge 
                            key={skill} 
                            colorScheme="blue"
                            px={2}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="500">
                            {skill}
                        </Badge>
                    ))}
                </HStack>
                <Text fontSize="sm" color="gray.600" fontWeight="500">
                    ⭐ {reviewsCount} reviews
                </Text>
                {mentor.newMentor && (
                    <Badge colorScheme="green" mt={2} borderRadius="full" px={2} py={1}>
                        New Mentor
                    </Badge>
                )}
            </Box>
        </RouterLink>
    );
};

// Sidebar Component
const Sidebar = () => {
    const [profile, setProfile] = useState(null);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo._id) return;
                const response = await fetch(getApiUrl(`/api/profile/${userInfo._id}`));
                if (!response.ok) throw new Error('Failed to fetch profile');
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [setIsLoading]);

    return (
        <VStack align="start" spacing={4} p={4} rounded="md" w="full">
            <HStack spacing={4}>
                <Avatar
                    src={profile?.photo ? getImageUrl(profile.photo) : `https://cdn-icons-png.freepik.com/512/147/147142.png`}
                    name="pp"
                    size="md"
                />
                <VStack align="start" spacing={1}>
                    <Heading as="h2" size="sm">
                        {profile?.user?.name}
                    </Heading>
                    <Link
                        as={RouterLink}
                        to={`/profile/${profile?.user?._id}`}
                        fontSize="sm"
                        color="gray.500"
                    >
                        Go to profile
                    </Link>
                </VStack>
            </HStack>
            <Divider />
            <VStack align="start" spacing={2}>
                <Button as={RouterLink} to="/main" leftIcon={<FaHome />} variant="ghost">
                    Main
                </Button>
                <Button as={RouterLink} to="/message" leftIcon={<FaCommentDots />} variant="ghost">
                    Message
                </Button>
                <Button as={RouterLink} to="/meetings" leftIcon={<FaCalendarAlt />} variant="ghost">
                    My meetings
                </Button>
                <Button as={RouterLink} to="/achievements" leftIcon={<FaMedal />} variant="ghost">
                    Achievements
                </Button>
                <Button as={RouterLink} to="/favorites" leftIcon={<FaHeart />} variant="ghost">
                    Favorite
                </Button>
                <Button as={RouterLink} to="/blog" leftIcon={<FaBlog />} variant="ghost">
                    Blog
                </Button>
            </VStack>
        </VStack>
    );
};


const InfoCard = ({title, description, progress}) => (
    <Box 
        p={6} 
        borderRadius="xl" 
        shadow="sm" 
        bg="white" 
        w="full"
        border="1px solid"
        borderColor="gray.200"
        transition="all 0.3s"
        _hover={{
            shadow: "lg",
            transform: "translateY(-4px)",
            borderColor: "brand.200"
        }}>
        <VStack align="start" spacing={3}>
            <Heading as="h4" size="md" fontWeight="700">{title}</Heading>
            <Text color="gray.600" lineHeight="1.6">{description}</Text>
            {progress && (
                <Box w="full">
                    <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" color="gray.600" fontWeight="600">Progress</Text>
                        <Text fontSize="sm" color="brand.600" fontWeight="700">{progress}%</Text>
                    </HStack>
                    <Progress 
                        value={progress} 
                        size="lg" 
                        colorScheme="blue" 
                        w="full"
                        borderRadius="full"
                        bg="gray.100"
                    />
                </Box>
            )}
        </VStack>
    </Box>
);

const UserHomePage = () => {
    const [mentors, setMentors] = useState([]);
    const navigate = useNavigate();
    const { setIsLoading } = useLoading(); // Use the loading context

    const handleEditProfile = () => {
        navigate(`/search-mentors`);
    };

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setIsLoading(true); // Start loading
                const response = await fetch(getApiUrl('/api/mentors/all'));
                if (!response.ok) throw new Error('Failed to fetch mentors');
                const data = await response.json();
                setMentors(data);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchMentors();
    }, [setIsLoading]);

    const showDesktopContent = useBreakpointValue({ base: false, lg: true });

    return (
        <Box>
            <Container maxW="8xl" mt={8}>
                <Grid templateColumns="repeat(24, 1fr)" gap={6}>
                    {showDesktopContent && (
                        <GridItem colSpan={5}>
                            <Sidebar />
                        </GridItem>
                    )}
                    <GridItem colSpan={showDesktopContent ? 13 : 24}>
                        <VStack spacing={8}>
                            <Box 
                                shadow="lg" 
                                bg="white" 
                                p={8} 
                                borderRadius="2xl" 
                                w="full"
                                border="1px solid"
                                borderColor="gray.200"
                                bgGradient="linear(to-br, white, brand.50)">
                                <Heading as="h3" size="lg" mb={2} fontWeight="700">
                                    Find Your Perfect Mentor
                                </Heading>
                                <Text color="gray.600" mb={6} lineHeight="1.6">
                                    Complete your profile to get personalized mentor recommendations
                                </Text>
                                <Button 
                                    onClick={handleEditProfile} 
                                    colorScheme="blue" 
                                    size="lg"
                                    borderRadius="xl"
                                    fontWeight="600"
                                    px={8}
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                                    transition="all 0.2s">
                                    Get Matched
                                </Button>
                            </Box>

                            <VStack align="start" spacing={6} w="full">
                                <Box>
                                    <Heading as="h3" size="lg" mb={2} fontWeight="700">
                                        Recommended Mentors
                                    </Heading>
                                    <Text color="gray.600">
                                        Handpicked mentors based on your profile and goals
                                    </Text>
                                </Box>
                                <Grid 
                                    templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} 
                                    gap={6} 
                                    w="full">
                                    {mentors.map((mentor) => (
                                        <GridItem key={mentor._id}>
                                            <MentorCard mentor={mentor} />
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
                                    progress={38} />
                                <InfoCard
                                    title="Your meetings"
                                    description="You don't have any booked meetings yet" />
                                <InfoCard
                                    title="Achievements"
                                    description="You don't have any achievements yet" />
                            </VStack>
                        </GridItem>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default UserHomePage;
