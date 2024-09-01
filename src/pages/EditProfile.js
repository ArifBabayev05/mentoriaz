import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Container,
    Heading,
    VStack,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    Wrap,
    WrapItem,
    IconButton,
    Text,
    Image,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useLoading } from '../helpers/loadingContext';

const EditProfile = () => {
    const { setIsLoading } = useLoading();
    const [photo, setPhoto] = useState('');
    const [bannerPhoto, setBannerPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [socialMedia, setSocialMedia] = useState({ instagram: '', facebook: '', linkedin: '' });
    const [interests, setInterests] = useState([]);
    const [skills, setSkills] = useState([]);
    const [isMentor, setIsMentor] = useState(false);
    const [inputValues, setInputValues] = useState({ skills: '', interests: '' });
    const [specialty, setSpecialty] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const response = await fetch(`http://localhost:5000/api/profile/${userInfo._id}`);
                const data = await response.json();

                setPhoto(data.photo || '');
                setBannerPhoto(data.bannerPhoto || '');
                setDescription(data.description || '');
                setExperience(data.experience || '');
                setEducation(data.education || '');
                setSocialMedia(data.socialMedia || {
                    instagram: '',
                    facebook: '',
                    linkedin: ''
                });
                setInterests(data.interests || []);
                setSkills(data.skills || []);
                setIsMentor(userInfo.isMentor || false);
                setSpecialty(data.specialty || '');
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [setIsLoading]);

    const handleFileUpload = async (e, setState) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        setState(data.filePath);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userInfo._id,
                    photo,
                    bannerPhoto,
                    description,
                    experience,
                    education,
                    socialMedia,
                    interests,
                    skills,
                    specialty
                })
            });

            if (response.ok) {
                navigate(`/profile/${userInfo._id}`);
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddItem = (key) => {
        if (inputValues[key].trim() !== '') {
            if (key === 'skills') {
                setSkills([
                    ...skills,
                    inputValues[key].trim()
                ]);
            } else if (key === 'interests') {
                setInterests([
                    ...interests,
                    inputValues[key].trim()
                ]);
            }
            setInputValues({
                ...inputValues,
                [key]: ''
            });
        }
    };

    const handleRemoveItem = (key, itemToRemove) => {
        if (key === 'skills') {
            setSkills(skills.filter(item => item !== itemToRemove));
        } else if (key === 'interests') {
            setInterests(interests.filter(item => item !== itemToRemove));
        }
    };

    const handleInputChange = (key, value) => {
        setInputValues({
            ...inputValues,
            [key]: value
        });
    };

    const handleBackToProfile = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        navigate(`/profile/${userInfo._id}`);
    };

    return (
        <Container maxW="container.lg" py={10}>
            <Box
                bg="white"
                p={6}
                rounded="lg"
                shadow="lg"
                maxW={{
                    base: '90%',
                    sm: '70%',
                    md: '60%',
                    lg: '50%'
                }}
                mx="auto">
                <HStack mb={10}>
                    <IconButton
                        icon={<ArrowBackIcon />}
                        onClick={handleBackToProfile}
                        aria-label="Back to Profile" />
                    <Heading as="h2" size="xl" textAlign="center">
                        Məlumatları yeniləyin
                    </Heading>
                </HStack>
                <form onSubmit={submitHandler}>
                    <VStack spacing={4}>
                        <FormControl id="photo" mb={4}>
                            <FormLabel>Profile Photo</FormLabel>
                            <Input
                                type="file"
                                display="none"
                                onChange={(e) => handleFileUpload(e, setPhoto)}
                                id="profile-photo-input" />
                            <HStack spacing={10}>
                                <Button
                                    as="label"
                                    htmlFor="profile-photo-input"
                                    colorScheme="blue"
                                    variant="outline"
                                    cursor="pointer">
                                    Şəkil seçin
                                </Button>
                                {photo && (
                                    <Text mt={2} color="gray.600">
                                        <Image
                                            mt={2}
                                            src={"http://localhost:5000" + photo}
                                            alt="Banner Preview"
                                            boxSize="100px"
                                            objectFit="cover"
                                            borderRadius="md" />
                                    </Text>
                                )}
                            </HStack>
                        </FormControl>

                        <FormControl id="bannerPhoto">
                            <FormLabel>Banner Photo</FormLabel>
                            <Input
                                type="file"
                                display="none"
                                onChange={(e) => handleFileUpload(e, setBannerPhoto)}
                                id="banner-photo-input" />
                            <HStack spacing={10}>
                                <Button
                                    as="label"
                                    htmlFor="banner-photo-input"
                                    colorScheme="blue"
                                    variant="outline"
                                    cursor="pointer">
                                    Şəkil seçin
                                </Button>
                                {bannerPhoto && (<Image
                                    mt={2}
                                    src={"http://localhost:5000" + bannerPhoto}
                                    alt="Banner Preview"
                                    boxSize="100px"
                                    width="300px"
                                    objectFit="cover"
                                    borderRadius="md" />)}
                            </HStack>
                        </FormControl>

                        <FormControl id="specialty">
                            <FormLabel>Specialty</FormLabel>
                            <Input
                                type="text"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)} />
                        </FormControl>

                        <FormControl id="description">
                            <FormLabel>Description</FormLabel>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormControl>

                        <FormControl id="experience">
                            <FormLabel>Experience</FormLabel>
                            <Textarea value={experience} onChange={(e) => setExperience(e.target.value)} />
                        </FormControl>

                        <FormControl id="education">
                            <FormLabel>Education</FormLabel>
                            <Input
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)} />
                        </FormControl>

                        <FormControl id="instagram">
                            <FormLabel>Instagram</FormLabel>
                            <Input
                                type="text"
                                value={socialMedia.instagram}
                                onChange={(e) => setSocialMedia({
                                    ...socialMedia,
                                    instagram: e.target.value
                                })} />
                        </FormControl>

                        <FormControl id="facebook">
                            <FormLabel>Facebook</FormLabel>
                            <Input
                                type="text"
                                value={socialMedia.facebook}
                                onChange={(e) => setSocialMedia({
                                    ...socialMedia,
                                    facebook: e.target.value
                                })} />
                        </FormControl>

                        <FormControl id="linkedin">
                            <FormLabel>LinkedIn</FormLabel>
                            <Input
                                type="text"
                                value={socialMedia.linkedin}
                                onChange={(e) => setSocialMedia({
                                    ...socialMedia,
                                    linkedin: e.target.value
                                })} />
                        </FormControl>

                        <FormControl id="skills">
                            <FormLabel>Skills</FormLabel>
                            <HStack spacing={2}>
                                <Input
                                    type="text"
                                    value={inputValues.skills}
                                    onChange={(e) => handleInputChange('skills', e.target.value)} />
                                <Button
                                    colorScheme="blue"
                                    onClick={() => handleAddItem('skills')}>
                                    Add Skill
                                </Button>
                            </HStack>
                            <Wrap mt={2}>
                                {skills.map((skill, index) => (
                                    <WrapItem key={index}>
                                        <Tag
                                            size="md"
                                            borderRadius="full"
                                            variant="solid"
                                            color="white"
                                            colorScheme="blue">
                                            
                                            <TagLabel>{skill}</TagLabel>
                                            <TagCloseButton onClick={() => handleRemoveItem('skills', skill)} />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </FormControl>

                        <FormControl id="interests">
                            <FormLabel>Interests</FormLabel>
                            <HStack spacing={2}>
                                <Input
                                    type="text"
                                    value={inputValues.interests}
                                    onChange={(e) => handleInputChange('interests', e.target.value)} />
                                <Button
                                    colorScheme="blue"
                                    onClick={() => handleAddItem('interests')}>
                                    Add Interest
                                </Button>
                            </HStack>
                            <Wrap mt={2}>
                                {interests.map((interest, index) => (
                                    <WrapItem key={index}>
                                        <Tag
                                            size="md"
                                            borderRadius="full"
                                            variant="solid"
                                            color="white"
                                            colorScheme="green">
                                            <TagLabel>{interest}</TagLabel>
                                            <TagCloseButton onClick={() => handleRemoveItem('interests', interest)} />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </FormControl>
                        

                        <Button
                            type="submit"
                            colorScheme="teal"
                            size="lg"
                            width="full"
                            mt={6}>
                            Məlumatları yeniləyin
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
};

export default EditProfile;
