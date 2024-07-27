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
    ButtonGroup
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import images from '../helpers/imageLoader';

import '../style/Home.css';
import FindMentorSection from '../components/FindMentorSection';
import FAQSection from '../components/FAQSection';


const Home = () => {
    return (
        <Box w="100%" p={4} textAlign="center" bg="background.50">
            <Flex as="nav" p={4} alignItems="center">
                <Image src={images['mentor-main.png']} alt="Mentoriaz Logo" boxSize="50px"/>
                <Spacer/>
                <HStack spacing={8} alignItems="center">
  <Box position="relative">
    <Button
      as={Link}
      to="/mentor-tap"
      variant="link"
      fontWeight="bold"
      color="darkBlue.500"
      className="topButton"
      _hover={{
        textDecoration: 'none',  
      }}
    >
      Mentor Tap
    </Button>
    <Box
      position="absolute"
      bottom="-2px"
      left="0"
      right="0"
      height="2px"
      bg="blue.500"
      borderRadius="full"
    />
  </Box>
  <Button
    as={Link}
    to="/mentor-ol"
    variant="link"
    fontWeight="bold"
    color="darkBlue.500"
    className="topButton"
    _hover={{
      textDecoration: 'none',  
    }}
  >
    Mentor Ol
  </Button>
</HStack>

                <Spacer/>
                <Button as={Link} to="/login" colorScheme="blue">Daxil Ol</Button>
            </Flex>

            <VStack spacing={6} mt={10} align="center">
                <Heading as="h1" size="2xl" color="blue.500">
                    Mentoriaz'a Xoş Gəlmisiz!
                </Heading>
                <Text fontSize="xl" fontWeight="bold" color="black.500">
                    Təcrübələr paylaşdıqca çoxalır
                </Text>
                <Text fontSize="md" color="gray.500" textAlign="center">
                    Mentoriaz sizə karyeranızda kömək olmaq üçün yaradıldı
                </Text>

                <HStack spacing={2} mt={6} align="center" w="full" maxW="lg">
                    <InputGroup size="lg" flex="1">
                        <InputLeftElement
                            pointerEvents="none"
                            children={< SearchIcon color = "gray.500" />}/>
                        <Input placeholder="Mentor axtar..." bg="white.500"/>
                    </InputGroup>
                    <Button colorScheme="blue" size="lg">
                        Mentor Tap
                    </Button>
                </HStack>
            </VStack>
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
            <Box mt={20} textAlign="center">
                <Text fontSize="lg" color="gray.600">Who is it for</Text>
                <Heading as="h2" size="xl" mt={4} mb={6} fontWeight="bold">
                    Build your career with a plan that works
                </Heading>
                <HStack spacing={4} justify="center" mb={10} flexWrap="wrap">
                    <Button variant="outline" colorScheme="blue">Career guidance</Button>
                    <Button variant="outline" colorScheme="blue">Starting in a new profession</Button>
                    <Button variant="outline" colorScheme="blue">Changing careers</Button>
                    <Button variant="outline" colorScheme="blue">Working abroad</Button>
                    <Button variant="outline" colorScheme="blue">Mentorship for leaders</Button>
                </HStack>
                <Flex justifyContent="center" alignItems="center" spacing={8} flexWrap="wrap">
                    <Box bg="white" p={6} rounded="md" shadow="md" maxW="sm" textAlign="left" m={4}>
                        <Image src={images['a.png']} alt="Discover Yourself" boxSize="50px" mb={4}/>
                        <Heading as="h3" size="md" mb={2}>Discover Yourself</Heading>
                        <Text fontSize="sm" color="gray.600">
                            Evaluate your level and master what will help you advance in your profession.
                        </Text>
                    </Box>
                    <Box bg="white" p={6} rounded="md" shadow="md" maxW="sm" textAlign="left" m={4}>
                        <Image src={images['a.png']} alt="Set Goals" boxSize="50px" mb={4}/>
                        <Heading as="h3" size="md" mb={2}>Set Goals</Heading>
                        <Text fontSize="sm" color="gray.600">
                            Create a long-term development plan and follow it step by step, without
                            abandoning it halfway.
                        </Text>
                    </Box>
                    <Box bg="white" p={6} rounded="md" shadow="md" maxW="sm" textAlign="left" m={4}>
                        <Image src={images['a.png']} alt="Navigate Your Path" boxSize="50px" mb={4}/>
                        <Heading as="h3" size="md" mb={2}>Navigate Your Path</Heading>
                        <Text fontSize="sm" color="gray.600">
                            Gain confidence and find your place in the IT community.
                        </Text>
                    </Box>
                </Flex>
            </Box>

            <Box mt={20} textAlign="center">
                <Text fontSize="lg" color="gray.600">How It Works</Text>
                <Heading as="h2" size="xl" mt={4} mb={6} fontWeight="bold">
                    Engage with a mentor according to a proven plan
                </Heading>
                <HStack spacing={8} justify="center" mb={10} flexWrap="wrap">
                    {[
                        {
                            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=Mn' +
                                    'wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                            title: 'Living room Sofa',
                            description: 'This sofa is perfect for modern trinspired spaces, earthy' +
                                    ' toned spacage d' +
                                    'esign.'
                        }, {
                            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=Mn' +
                                    '=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
                            title: 'Modern Chair',
                            description: 'A sleek modern chair that will fit perfectly in your minimalist home design.'
                        }, {
                            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=Mn' +
                                    '=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80',
                            title: 'Wooden Desk',
                            description: 'A sturdy wooden desk that is perfect for both home offices and professional work' +
                                    'spaces.'
                        }
                    ].map((item, idx) => (
                        <Card maxW='sm' bg="background.500" border="none" shadow="none" key={idx}>
                            <CardBody>
                                <Image src={item.image} alt={item.title} borderRadius='lg'/>
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{item.title}</Heading>
                                    <Text>{item.description}</Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </HStack>

            </Box>
            <FindMentorSection/>
            <FAQSection/>
        </Box>
    );
};

export default Home;
