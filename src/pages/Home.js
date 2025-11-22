import React from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Input,
    Image,
    Flex,
    Spacer,
    IconButton,
    InputGroup,
    InputLeftElement,
    Card,
    CardBody,
    Stack,
    Divider,
    CardFooter,
    ButtonGroup,
    SimpleGrid
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import images from '../helpers/imageLoader';
import goal from '../assets/images/goal.png'

import '../style/Home.css';
import FindMentorSection from '../components/FindMentorSection';
import FAQSection from '../components/FAQSection';
import axiosInstance from '../axios.config';

const Home = () => {
    return (
        <Box w="100%" bg="white" position="relative" overflow="hidden">
            {/* Hero Section with Gradient Background */}
            <Box
                bgGradient="linear(to-br, brand.50, blue.100, purple.50)"
                position="relative"
                pb={20}
                pt={8}>
                {/* Animated Background Elements */}
                <Box
                    position="absolute"
                    top="-100px"
                    right="-100px"
                    w="400px"
                    h="400px"
                    borderRadius="full"
                    bg="brand.200"
                    opacity="0.3"
                    filter="blur(80px)"
                />
                <Box
                    position="absolute"
                    bottom="-100px"
                    left="-100px"
                    w="400px"
                    h="400px"
                    borderRadius="full"
                    bg="purple.200"
                    opacity="0.3"
                    filter="blur(80px)"
                />

                <Flex as="nav" p={6} alignItems="center" maxW="7xl" mx="auto">
                    <Image src={images['mentor-main.png']} alt="Mentoriaz Logo" boxSize="50px" borderRadius="lg"/>
                    <Spacer/>
                    <HStack spacing={8} alignItems="center">
                        <Button
                            as={Link}
                            to="/search-mentors"
                            variant="link"
                            fontWeight="600"
                            color="gray.700"
                            _hover={{
                                color: 'brand.500',
                                textDecoration: 'none'
                            }}>
                            Find Mentors
                        </Button>
                        <Button
                            as={Link}
                            to="/register"
                            variant="link"
                            fontWeight="600"
                            color="gray.700"
                            _hover={{
                                color: 'brand.500',
                                textDecoration: 'none'
                            }}>
                            Become a Mentor
                        </Button>
                    </HStack>
                    <Spacer/>
                    <HStack spacing={4}>
                        <Button as={Link} to="/login" variant="ghost" fontWeight="600">
                            Sign In
                        </Button>
                        <Button as={Link} to="/register" colorScheme="blue" fontWeight="600" px={6}>
                            Get Started
                        </Button>
                    </HStack>
                </Flex>

                <VStack spacing={8} mt={16} mb={12} align="center" maxW="4xl" mx="auto" px={4} position="relative" zIndex={1}>
                    <Box textAlign="center">
                        <Text 
                            fontSize="sm" 
                            fontWeight="600" 
                            color="brand.600" 
                            mb={4}
                            letterSpacing="0.1em"
                            textTransform="uppercase">
                            Connect • Grow • Succeed
                        </Text>
                        <Heading 
                            as="h1" 
                            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="800"
                            lineHeight="1.1"
                            mb={6}
                            bgGradient="linear(to-r, brand.600, brand.800)"
                            bgClip="text">
                            Find Your Perfect Mentor
                        </Heading>
                        <Text 
                            fontSize={{ base: "lg", md: "xl" }} 
                            color="gray.600" 
                            maxW="2xl"
                            lineHeight="1.6"
                            mb={8}>
                            Accelerate your career with personalized mentorship from industry experts. 
                            Join thousands of professionals achieving their goals faster.
                        </Text>
                    </Box>

                    <HStack spacing={4} mt={6} w="full" maxW="2xl" flexDirection={{ base: "column", md: "row" }}>
                        <InputGroup size="lg" flex="1">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.400" />}/>
                            <Input 
                                placeholder="Search for mentors, skills, industries..." 
                                bg="white"
                                border="2px solid"
                                borderColor="gray.200"
                                borderRadius="xl"
                                _focus={{
                                    borderColor: 'brand.500',
                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                }}
                                _hover={{
                                    borderColor: 'brand.300'
                                }}
                            />
                        </InputGroup>
                        <Button 
                            colorScheme="blue" 
                            size="lg" 
                            px={8}
                            borderRadius="xl"
                            fontWeight="600"
                            w={{ base: "full", md: "auto" }}>
                            Search
                        </Button>
                    </HStack>
                </VStack>
            </Box>
            <Flex justifyContent="center" alignItems="center" mt={20} flexWrap="wrap">
                <Box w="full" maxW="1200px">
                    <HStack spacing={8} mb={8} justify="center">
                        <Box className="image-container">
                            <Image src={images['a.png']} alt="User 1" boxSize="75px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['fff.png']} alt="User 8" boxSize="80px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['aa.png']} alt="User 2" boxSize="85px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['b.png']} alt="User 3" boxSize="90px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['bb.png']} alt="User 4" boxSize="85px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['c.png']} alt="User 5" boxSize="80px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['b.png']} alt="User 3" boxSize="90px" borderRadius="full"/>
                        </Box>
                    </HStack>
                    <HStack spacing={8} justify="center" mb={8}>
                        <Box className="image-container">
                            <Image src={images['q.png']} alt="User 9" boxSize="70px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['aa.png']} alt="User 2" boxSize="85px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['a.png']} alt="User 1" boxSize="75px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['d.png']} alt="User 6" boxSize="70px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image
                                src={images['mentoriaz-blue.png']}
                                alt="Mentoriaz Logo"
                                boxSize="140px"
                                borderRadius="20"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['ff.png']} alt="User 7" boxSize="80px" borderRadius="full"/>
                        </Box>

                        <Box className="image-container">
                            <Image src={images['fff.png']} alt="User 8" boxSize="80px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['q.png']} alt="User 9" boxSize="70px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['q.png']} alt="User 9" boxSize="70px" borderRadius="full"/>
                        </Box>
                    </HStack>
                    <HStack spacing={8} justify="center">
                        <Box className="image-container">
                            <Image src={images['ss.png']} alt="User 10" boxSize="75px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['v.png']} alt="User 11" boxSize="95px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['a.png']} alt="User 12" boxSize="80px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['b.png']} alt="User 13" boxSize="85px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['bb.png']} alt="User 14" boxSize="70px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['v.png']} alt="User 11" boxSize="85px" borderRadius="full"/>
                        </Box>
                        <Box className="image-container">
                            <Image src={images['ss.png']} alt="User 10" boxSize="65px" borderRadius="full"/>
                        </Box>
                    </HStack>
                </Box>
            </Flex>
            {/* Features Section */}
            <Box py={20} bg="white" maxW="7xl" mx="auto" px={4}>
                <VStack spacing={12}>
                    <Box textAlign="center" maxW="2xl">
                        <Text fontSize="sm" fontWeight="600" color="brand.600" mb={3} letterSpacing="0.1em" textTransform="uppercase">
                            Who It's For
                        </Text>
                        <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700" mb={4}>
                            Build Your Career with a Winning Plan
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            Whether you're starting out or leveling up, find the perfect mentor for your journey
                        </Text>
                    </Box>
                    
                    <HStack spacing={3} justify="center" mb={12} flexWrap="wrap" gap={3}>
                        <Button 
                            as={Link} 
                            to="/register"
                            bg="brand.500"
                            color="white" 
                            borderRadius="full"
                            px={6}
                            py={6}
                            fontWeight="600"
                            _hover={{
                                bg: "brand.600",
                                transform: "translateY(-2px)",
                                boxShadow: "lg"
                            }}
                            transition="all 0.2s">
                            Career Support
                        </Button>
                        <Button 
                            as={Link} 
                            to="/register"
                            bg="brand.500"
                            color="white" 
                            borderRadius="full"
                            px={6}
                            py={6}
                            fontWeight="600"
                            _hover={{
                                bg: "brand.600",
                                transform: "translateY(-2px)",
                                boxShadow: "lg"
                            }}
                            transition="all 0.2s">
                            Choose Your Future
                        </Button>
                        <Button 
                            as={Link} 
                            to="/register"
                            bg="brand.500"
                            color="white" 
                            borderRadius="full"
                            px={6}
                            py={6}
                            fontWeight="600"
                            _hover={{
                                bg: "brand.600",
                                transform: "translateY(-2px)",
                                boxShadow: "lg"
                            }}
                            transition="all 0.2s">
                            Work Abroad
                        </Button>
                        <Button 
                            as={Link} 
                            to="/register"
                            bg="brand.500"
                            color="white" 
                            borderRadius="full"
                            px={6}
                            py={6}
                            fontWeight="600"
                            _hover={{
                                bg: "brand.600",
                                transform: "translateY(-2px)",
                                boxShadow: "lg"
                            }}
                            transition="all 0.2s">
                            Executive Mentoring
                        </Button>
                        <Button 
                            as={Link} 
                            to="/register"
                            bg="brand.500"
                            color="white" 
                            borderRadius="full"
                            px={6}
                            py={6}
                            fontWeight="600"
                            _hover={{
                                bg: "brand.600",
                                transform: "translateY(-2px)",
                                boxShadow: "lg"
                            }}
                            transition="all 0.2s">
                            Career Switch
                        </Button>
                    </HStack>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full" maxW="6xl">
                        <Box 
                            bg="white" 
                            p={8} 
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
                            }}>
                            <Box 
                                w="80px" 
                                h="80px" 
                                bg="brand.100" 
                                borderRadius="xl" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center"
                                mx="auto"
                                mb={6}>
                                <Text fontSize="3xl">🎯</Text>
                            </Box>
                            <Heading as="h3" size="lg" mb={3} fontWeight="700">Discover Your Potential</Heading>
                            <Text fontSize="md" color="gray.600" lineHeight="1.7">
                                Assess your level and develop skills that will help you advance in your profession.
                            </Text>
                        </Box>
                        <Box 
                            bg="white" 
                            p={8} 
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
                            }}>
                            <Box 
                                w="80px" 
                                h="80px" 
                                bg="purple.100" 
                                borderRadius="xl" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center"
                                mx="auto"
                                mb={6}>
                                <Text fontSize="3xl">📈</Text>
                            </Box>
                            <Heading as="h3" size="lg" mb={3} fontWeight="700">Set Goals</Heading>
                            <Text fontSize="md" color="gray.600" lineHeight="1.7">
                                Create a long-term development plan and follow it step by step, maintaining consistency.
                            </Text>
                        </Box>
                        <Box 
                            bg="white" 
                            p={8} 
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
                            }}>
                            <Box 
                                w="80px" 
                                h="80px" 
                                bg="green.100" 
                                borderRadius="xl" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center"
                                mx="auto"
                                mb={6}>
                                <Text fontSize="3xl">🚀</Text>
                            </Box>
                            <Heading as="h3" size="lg" mb={3} fontWeight="700">Navigate Your Path</Heading>
                            <Text fontSize="md" color="gray.600" lineHeight="1.7">
                                Build confidence in your career and find your place in your field.
                            </Text>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Box>

            {/* How It Works Section */}
            <Box py={20} bg="gray.50" maxW="7xl" mx="auto" px={4}>
                <VStack spacing={12}>
                    <Box textAlign="center" maxW="2xl">
                        <Text fontSize="sm" fontWeight="600" color="brand.600" mb={3} letterSpacing="0.1em" textTransform="uppercase">
                            How It Works
                        </Text>
                        <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700" mb={4}>
                            Get Started in 4 Simple Steps
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            Find the perfect mentor based on your chosen career path
                        </Text>
                    </Box>
                <HStack spacing={8} justify="center" mb={10} flexWrap="wrap">
                    {[
                        {
                            image: images['logo2.png'],
                            title: 'Choose Your Goal',
                            description: 'Select your objective and find the right mentor to plan your growth.'
                        }, {
                            image: images['logo3.png'],
                            title: 'Find Your Mentor',
                            description: 'Discover the ideal mentor who will support your career development.'
                        }, {
                            image: images['cal.png'],
                            title: 'Schedule a Session',
                            description: 'Book a session with your mentor and accelerate your growth.'
                        }, {
                            image: images['cal2.png'],
                            title: 'Grow & Succeed',
                            description: 'İnkişafına kömək edəcək güclü və dəstəkl��yici resurslarla tanış ol.'
                        }
                    ].map((item, idx) => (
                        <Card maxW='sm' bg="background.500" border="none" shadow="none" key={idx}>
                            <CardBody>
                                <Image src={item.image} alt={item.title} borderRadius='lg' objectFit="contain" w="full" h="full" textAlign="center"/>
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{item.title}</Heading>
                                    <Text>{item.description}</Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </HStack>
                </VStack>
            </Box>
            <FindMentorSection/>
            <FAQSection/>
        </Box>
    );
};

export default Home;
