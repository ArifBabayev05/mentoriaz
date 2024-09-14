import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Container,
    Heading,
    VStack,
    HStack,
    IconButton,
    Text,
    Image
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useLoading } from '../helpers/loadingContext';

const VerifyProfile = () => {
    const { setIsLoading } = useLoading();
    const [passportPhoto, setPassportPhoto] = useState('');
    const [video, setVideo] = useState('');
    const [isVerificated, setIsVerificated] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const response = await fetch(`http://localhost:5000/api/profile/${userInfo._id}`);
                const data = await response.json();
                setPassportPhoto(data.passportPhoto || '');
                setVideo(data.video || '');
                setIsVerificated(data.isVerificated || '');  // Update this line to set the actual verification status
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
                body: JSON.stringify({ userId: userInfo._id, passportPhoto, video, isVerificated : 2 })
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
                        Profilinizi təsdiqləyin
                    </Heading>
                </HStack>
                <form onSubmit={submitHandler}>
                    <VStack spacing={4}>
                        <FormControl id="video">
                            <FormLabel>Video halında təqdimatınız</FormLabel>
                            <Input
                                type="file"
                                display="none"
                                onChange={(e) => handleFileUpload(e, setVideo)}
                                id="video-photo-input" />
                            <HStack spacing={10}>
                                <Button
                                    as="label"
                                    htmlFor="video-photo-input"
                                    colorScheme="blue"
                                    variant="outline"
                                    isDisabled={isVerificated === '2'}
                                    cursor="pointer">
                                    Videonu seçin
                                </Button>
                                {video && (
                                    <video
                                        mt={2}
                                        src={`http://localhost:5000${video}`}
                                        alt="video Preview"
                                        width="300px"
                                        controls
                                        style={{
                                            borderRadius: 'md',
                                            objectFit: 'cover'
                                        }} />
                                )}
                            </HStack>
                        </FormControl>
                        <FormControl id="passportPhoto">
                            <FormLabel>Şəxsiyyət vəsiqəsi şəkli</FormLabel>
                            <Input
                                type="file"
                                display="none"
                                onChange={(e) => handleFileUpload(e, setPassportPhoto)}
                                id="passport-photo-input" />
                            <HStack spacing={10}>
                                <Button
                                    as="label"
                                    htmlFor="passport-photo-input"
                                    colorScheme="blue"
                                    variant="outline"
                                    isDisabled={isVerificated === '2'}
                                    cursor="pointer">
                                    Şəkil seçin
                                </Button>
                                {passportPhoto && (
                                    <Image
                                        mt={2}
                                        src={`http://localhost:5000${passportPhoto}`}
                                        alt="passportPhoto Preview"
                                        boxSize="100px"
                                        width="300px"
                                        objectFit="cover"
                                        borderRadius="md" />
                                )}
                            </HStack>
                        </FormControl>

                        <Button
                            type="submit"
                            isDisabled={isVerificated === '2'}
                            colorScheme="teal"
                            size="lg"
                            width="full"
                            mt={6}>
                                
                            {isVerificated === '2' ? 'Sizin aktiv müraciətiniz var' : 'Məlumatları yeniləyin'}
                        </Button>

                    </VStack>
                </form>
            </Box>
        </Container>
    );
};

export default VerifyProfile;
