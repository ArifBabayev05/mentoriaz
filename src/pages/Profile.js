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
    Tag,
    Icon,
    Image,
    useDisclosure,
    Flex,

    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Textarea,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {EditIcon, CheckCircleIcon} from '@chakra-ui/icons';
import StarRating from '../components/StarRating';
import MyReviews from '../components/MyReviews';
import MyMentors from '../components/MyMentors';
import {useLoading} from '../helpers/loadingContext';
import images from '../helpers/imageLoader';
import Header from '../components/Header';

const Profile = ({currentUserId}) => {
    const {setIsLoading} = useLoading();
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

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ name: '', description: '', price: '', time: '' });
    

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchProfile = async() => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const fetchReviews = async() => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/reviews/${userId}`);
                const data = await response.json();
                setReviews(data);
                setFilteredReviews(data);
            } catch (error) {
                console.error("Failed to load reviews", error);
            } finally {
                setIsLoading(false);
            }
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
        return null;
    }

    const handleAddCard = async () => {
        if (Object.values(newCard).some(value => !value.trim())) {
            alert('Please fill all fields.');
            return;
        }
    
        setIsLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userInfo._id,
                    cards: [newCard],
                }),
            });
            if (response.ok) {
                const addedCard = await response.json();
                setCards(prevCards => [...prevCards, ...addedCard.cards]); // Append new cards
                setNewCard({ name: '', description: '', price: '', time: '' });
            } else {
                alert.error('Error adding card');
            }
        } catch (error) {
            console.error('Error adding card:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
    };
    const handleNumberInputChange = (valueAsString, valueAsNumber) => {
        setNewCard(prevCard => ({
            ...prevCard,
            price: valueAsString
        }));
    };

    const handleEditProfile = () => {
        navigate(`/edit-profile/${userId}`);
    };

    const handleAddReview = async() => {
        if (newReview.trim() === '' || rating === 0) 
            return;
        
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/reviews/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: currentUser._id, text: newReview, rating})
            });

            if (response.ok) {
                const addedReview = await response.json();
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
        } catch (error) {
            console.error("Error adding review", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteReview = async(reviewId) => {
        try {
            setIsLoading(true);
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
        } catch (error) {
            console.error('Error deleting review', error);
        } finally {
            setIsLoading(false);
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

            <Container maxW="7xl">
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
                            <Flex>
                                {profile.user.name}
                                {profile.isVerificated === '1' && (<Image mx={2} src={images['verified.png']} mt="3px" w="35px"/>)}
                            </Flex>
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
                                <Tab>Məlumatlar</Tab>
                                <Tab>{profile.isMentor
                                        ? 'Dəyərləndirmələr'
                                        : 'Mentorlarım'}</Tab>
                                {profile.isMentor
                                    ? <Tab>Paketlər</Tab>
                                    : null}
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
                                        ? (<MyReviews
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
                                            setRating={setRating}/>)
                                        : (<MyMentors currentUser={currentUser}/>)}
                                </TabPanel>
                                <TabPanel>
                                <Box w="100%" mx="auto">
    {isCurrentUser && (
        <>
            <Button onClick={onOpen}>Paket Əlavə et</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Yeni Paket Əlavə et</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder="Paket adı"
                                name="name"
                                value={newCard.name}
                                onChange={handleCardInputChange}
                            />
                            <Textarea 
                                placeholder="Paket təsviri"
                                name="description"
                                value={newCard.description}
                                onChange={handleCardInputChange}
                            />
                            <NumberInput 
                                placeholder="Qiymət"
                                name="price"
                                value={newCard.price}
                                onChange={handleNumberInputChange}
                                precision={2}
                                step={0.01}
                            >
                                <NumberInputField />
                            </NumberInput>
                            <Input 
                                placeholder="Zaman"
                                name="time"
                                value={newCard.time}
                                onChange={handleCardInputChange}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddCard}>
                            Əlavə et
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Bağla</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )}
    {profile.cards.length === 0 ? (
                <>
                    <Heading textAlign="center" size="lg">
                        Hələki Mentor heçbir paket əlavə etməyib
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
                profile.cards.map((card, index) => (
                    <Box key={index} borderWidth={1} borderRadius="lg" p={4} mb={4}>
                        <Heading size="md">{card.name}</Heading>
                        <Text>{card.description}</Text>
                        <Text>Price: {card.price}</Text>
                        <Text>Time: {card.time}</Text>
                    </Box>
                ))
            )}
</Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </VStack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Profile;