import React, {useState, useEffect} from 'react';
import {
    Box,
    Container,
    VStack,
    Stack,
    HStack,
    Avatar,
    Heading,
    Text,
    Button,
    Divider,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Progress,
    Textarea,
    FormControl,
    FormLabel,
    IconButton,
    Select,
    Tag
} from '@chakra-ui/react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {FaStar, FaTrash} from 'react-icons/fa';
import {EditIcon} from '@chakra-ui/icons';
import StarRating from '../components/StarRating';
import MyReviews from '../components/MyReviews';
import MyMentors from '../components/MyMentors';

const Profile = ({currentUserId}) => {
    const {userId} = useParams();
    const [profile,
        setProfile] = useState(null);
    const [reviews,
        setReviews] = useState([]);
    const [newReview,
        setNewReview] = useState('');
    const [filteredReviews,
        setFilteredReviews] = useState([]);
    const [rating,
        setRating] = useState(0);
    const [visibleReviews,
        setVisibleReviews] = useState(6);

    const [filterRating,
        setFilterRating] = useState(0);

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchProfile = async() => {
            const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
            const data = await response.json();
            setProfile(data);
        };

        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const fetchReviews = async() => {
            const response = await fetch(`http://localhost:5000/api/reviews/${userId}`);
            const data = await response.json();
            setReviews(data);
            setFilteredReviews(data); // Set the initial filtered reviews
        };

        fetchReviews();
    }, [userId]);

    useEffect(() => {
        if (filterRating > 0) {
            setFilteredReviews(reviews.filter(review => review.rating === filterRating));
        } else {
            setFilteredReviews(reviews);
        }
    }, [filterRating, reviews]);

    if (!profile) {
        return <Text>Loading...</Text>;
    }

    const handleEditProfile = () => {
        navigate(`/edit-profile/${userId}`);
    };

    const handleAddReview = async() => {
        if (newReview.trim() === '' || rating === 0) 
            return;
        
        const response = await fetch(`http://localhost:5000/api/reviews/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: currentUser._id, text: newReview, rating: rating})
        });

        if (response.ok) {
            const addedReview = await response.json();
            // Add the current user's info directly to the review before updating state
            const fullReview = {
                ...addedReview,
                user: {
                    _id: currentUser._id,
                    name: currentUser.name
                }
            };
            setReviews([
                ...reviews,
                fullReview
            ]);
            setNewReview('');
            setRating(0);
        } else {
            console.error("Failed to add review");
        }
    };

    const handleDeleteReview = async(reviewId) => {
        const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: currentUser._id})
        });

        if (response.ok) {
            setReviews(reviews.filter((review) => review._id !== reviewId));
        } else {
            console.error('Failed to delete review');
        }
    };

    const showMoreReviews = () => {
        setVisibleReviews(visibleReviews + 6);
    };

    const bannerPhotoPath = profile.bannerPhoto
        ? `http://localhost:5000${profile
            .bannerPhoto
            .replace(/\\/g, '/')}`
        : `https://www.pixelstalk.net/wp-content/uploads/2016/08/Background-Images-Full-HD-Wallpapers.jpg`;

    const isCurrentUser = currentUser._id === profile.user._id;

    return (
        <Box w="100%" mx="auto">
            <Box
                bgImage={`url(${bannerPhotoPath})`}
                bgPosition="center"
                bgSize="cover"
                w="100%"
                h="200px"
                borderRadius="md"
                mb={10}
                position="relative"/>

            <Container maxW="8xl">
                <Stack
                    direction={{
                    base: 'column',
                    md: 'row'
                }}
                    spacing={10}
                    justify="center"
                    align="center"
                    px={4}>
                    <Avatar
                        src={profile.photo
                        ? `http://localhost:5000${profile.photo}`
                        : `https://cdn-icons-png.freepik.com/512/147/147142.png`}
                        alt="Profile Photo"
                        size="2xl"
                        borderWidth={4}
                        borderColor="white"
                        mt="-75px"/>
                    <VStack spacing={1} align="start" flex="1">
                        <Heading as="h2" size="lg">
                            {profile.user.name}
                        </Heading>
                        <Text fontSize="lg">{profile.profession}</Text>
                        <Text color="gray.500">Passport not verified</Text>
                        <HStack spacing={4} mt={2}>
                            {profile.socialMedia
                                ?.linkedin && (
                                    <Link href={profile.socialMedia.linkedin} isExternal>
                                        <Text>LinkedIn</Text>
                                    </Link>
                                )}
                            {profile.socialMedia
                                ?.facebook && (
                                    <Link href={profile.socialMedia.facebook} isExternal>
                                        <Text>Facebook</Text>
                                    </Link>
                                )}
                            {profile.socialMedia
                                ?.instagram && (
                                    <Link href={profile.socialMedia.instagram} isExternal>
                                        <Text>Instagram</Text>
                                    </Link>
                                )}
                        </HStack>
                    </VStack>
                    {isCurrentUser && (
                        <Button
                            leftIcon={< EditIcon />}
                            onClick={handleEditProfile}
                            colorScheme="blue"
                            variant="outline"
                            mt={4}
                            alignSelf={{
                            base: 'center',
                            md: 'flex-start'
                        }}>
                            Edit profile
                        </Button>
                    )}
                </Stack>
                <Stack
                    direction={{
                    base: 'column',
                    lg: 'row'
                }}
                    spacing={10}
                    mt={10}
                    justify="center">
                    <VStack flex="3" spacing={4} align="start">
                        <Tabs variant="enclosed" width="100%">
                            <TabList>
                                <Tab>About</Tab>
                                <Tab>{profile.isMentor ? 'My Reviews' : 'My Mentors'}</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Text>{profile.description}</Text>
                                    <Divider my={4}/>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Disciplines
                                    </Text>
                                    <HStack spacing={4} wrap="wrap">
                                        {profile.disciplines
                                            ?.map((discipline, index) => (
                                                <Tag key={index} colorScheme="blue">
                                                    {discipline}
                                                </Tag>
                                            ))}
                                        {isCurrentUser && (
                                            <Button size="sm" variant="outline">
                                                + Add
                                            </Button>
                                        )}
                                    </HStack>
                                    <Divider my={4}/>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Skills
                                    </Text>
                                    <HStack spacing={4} wrap="wrap">
                                        {profile.skills
                                            ?.map((skill, index) => (
                                                <Tag key={index} colorScheme="blue">
                                                    {skill}
                                                </Tag>
                                            ))}
                                        {isCurrentUser && (
                                            <Button size="sm" variant="outline">
                                                + Add
                                            </Button>
                                        )}
                                    </HStack>
                                    <Divider my={4}/>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Experience
                                    </Text>
                                    <Text>{profile.experience}</Text>
                                    <Divider my={4}/>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Education
                                    </Text>
                                    <Text>{profile.education}</Text>
                                </TabPanel>
                                <TabPanel>
                                    {profile.isMentor
                                        ? (
                                            <MyReviews
                                              reviews={reviews}
                                              currentUser={currentUser}
                                              handleDeleteReview={handleDeleteReview}
                                              filteredReviews={filteredReviews}
                                              filterRating={filterRating}
                                              setFilterRating={setFilterRating}
                                              showMoreReviews={showMoreReviews}
                                              visibleReviews={visibleReviews}
                                              handleAddReview={handleAddReview}
                                              newReview={newReview}
                                              setNewReview={setNewReview}
                                              rating={rating}
                                              setRating={setRating}
                                            />
                                            )
                                        : (<MyMentors currentUser={currentUser}/>)}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </VStack>

                    {isCurrentUser && (
                        <VStack flex="1" spacing={4} align="start">
                            <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" w="full">
                                <Text fontWeight="bold">Fill out Profile</Text>
                                <Text color="gray.500">This will help mentors get to know you better</Text>
                                <Progress value={38} size="sm" colorScheme="blue" mt={2}/>
                            </Box>
                            <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" w="full">
                                <Text fontWeight="bold">Achievements</Text>
                                <Text color="gray.500">First Appointment with Mentor</Text>
                            </Box>
                        </VStack>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Profile;
