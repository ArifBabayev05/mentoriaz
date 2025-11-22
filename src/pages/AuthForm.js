import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Image,
  Heading,
  Text,
  Divider,
  AbsoluteCenter
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../helpers/imageLoader';
import { signInWithGoogle } from '../helpers/firebaseConfig';
import { getApiUrl } from '../utils/apiConfig';

const AuthForm = () => {

  const [userForm, setUserForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [mentorForm, setMentorForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (form, field, value) => {
    if (form === 'user') {
      setUserForm({ ...userForm, [field]: value });
    } else if (form === 'mentor') {
      setMentorForm({ ...mentorForm, [field]: value });
    } else {
      setLoginForm({ ...loginForm, [field]: value });
    }
  };

  const submitRegisterHandler = async (e, form, isMentor) => {
    e.preventDefault();
    const fullName = `${form.name} ${form.surname}`;

    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: form.email,
          password: form.password,
          isMentor,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Successfully registered!');
      navigate('/profile/' + data._id);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Successfully logged in!');
      navigate('/profile/' + data._id);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, brand.50, blue.100, purple.50)"
      position="relative"
      overflow="hidden"
      p={4}>
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
      <ToastContainer />
      <Box
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(20px)"
        p={8}
        rounded="2xl"
        shadow="2xl"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.8)"
        maxW={{
          base: '95%',
          sm: '90%',
          md: '500px',
          lg: '480px'
        }}
        width="100%"
        position="relative"
        zIndex={1}>
        <VStack spacing={6} align="stretch">
          <VStack spacing={3} mb={4}>
            <Image
              src={images['mentor-main.png']}
              alt="Mentoriaz Logo"
              boxSize="80px"
              mx="auto"
              borderRadius="xl" />
            <Heading 
              as="h2" 
              size="xl" 
              textAlign="center"
              bgGradient="linear(to-r, brand.600, brand.800)"
              bgClip="text"
              fontWeight="800">
              Welcome to Mentoriaz
            </Heading>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Connect with expert mentors and accelerate your career
            </Text>
          </VStack>
          <Tabs isFitted variant="enclosed" colorScheme="blue">
            <TabList mb="1em">
              <Tab fontWeight="600">User Registration</Tab>
              <Tab fontWeight="600">Mentor Registration</Tab>
              <Tab fontWeight="600">Sign In</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form onSubmit={(e) => submitRegisterHandler(e, userForm, false)}>
                  <VStack spacing={4} align="stretch">
                    <Button
                      variant="outline"
                      colorScheme="red"
                      width="full"
                      onClick={() => signInWithGoogle(false, navigate, toast)}
                      leftIcon={<FcGoogle />}>
                      Sign up with Google
                    </Button>

                    <Box position='relative' padding='5'>
                      <Divider />
                      <AbsoluteCenter bg='white' px='4'>
                        Or
                      </AbsoluteCenter>
                    </Box>
                    <FormControl id="user_name" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" value={userForm.name} onChange={(e) => handleChange('user', 'name', e.target.value)} />
                    </FormControl>

                    <FormControl id="user_surname" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        value={userForm.surname}
                        onChange={(e) => handleChange('user', 'surname', e.target.value)} />
                    </FormControl>

                    <FormControl id="user_email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" value={userForm.email} onChange={(e) => handleChange('user', 'email', e.target.value)} />
                    </FormControl>

                    <FormControl id="user_password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        value={userForm.password}
                        onChange={(e) => handleChange('user', 'password', e.target.value)} />
                    </FormControl>

                    <Button type='submit' colorScheme="blue" width="full">
                      Sign Up as User
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={(e) => submitRegisterHandler(e, mentorForm, true)}>
                  <VStack spacing={4} align="stretch">
                    <Button
                      variant="outline"
                      colorScheme="gray"
                      width="full"
                      size="lg"
                      borderRadius="xl"
                      fontWeight="600"
                      onClick={() => signInWithGoogle(true, navigate, toast)}
                      leftIcon={<FcGoogle />}
                      _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
                      transition="all 0.2s">
                      Sign up with Google
                    </Button>

                    <Box position='relative' padding='5'>
                      <Divider />
                      <AbsoluteCenter bg='white' px='4'>
                        Or
                      </AbsoluteCenter>
                    </Box>

                    <FormControl id="mentor_name" isRequired>
                      <FormLabel fontWeight="600">First Name</FormLabel>
                      <Input 
                        type="text" 
                        value={mentorForm.name} 
                        onChange={(e) => handleChange('mentor', 'name', e.target.value)}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                        _hover={{ borderColor: 'brand.300' }}
                      />
                    </FormControl>

                    <FormControl id="mentor_surname" isRequired>
                      <FormLabel fontWeight="600">Last Name</FormLabel>
                      <Input
                        type="text"
                        value={mentorForm.surname}
                        onChange={(e) => handleChange('mentor', 'surname', e.target.value)}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                        _hover={{ borderColor: 'brand.300' }}
                      />
                    </FormControl>

                    <FormControl id="mentor_email" isRequired>
                      <FormLabel fontWeight="600">Email</FormLabel>
                      <Input 
                        type="email" 
                        value={mentorForm.email} 
                        onChange={(e) => handleChange('mentor', 'email', e.target.value)}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                        _hover={{ borderColor: 'brand.300' }}
                      />
                    </FormControl>

                    <FormControl id="mentor_password" isRequired>
                      <FormLabel fontWeight="600">Password</FormLabel>
                      <Input
                        type="password"
                        value={mentorForm.password}
                        onChange={(e) => handleChange('mentor', 'password', e.target.value)}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                        _hover={{ borderColor: 'brand.300' }}
                      />
                    </FormControl>

                    <Button 
                      type='submit' 
                      colorScheme="blue" 
                      width="full"
                      size="lg"
                      borderRadius="xl"
                      fontWeight="600"
                      mt={2}
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                      transition="all 0.2s">
                      Sign Up as Mentor
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={submitLoginHandler}>
                  <VStack spacing={4} align="stretch">
                    <FormControl id="login_email" isRequired>
                      <FormLabel fontWeight="600">Email</FormLabel>
                      <Input 
                        type="email" 
                        value={loginForm.email} 
                        onChange={(e) => handleChange('login', 'email', e.target.value)}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                        _hover={{ borderColor: 'brand.300' }}
                      />
                    </FormControl>

                    <FormControl id="login_password" isRequired>
                      <FormLabel fontWeight="600">Password</FormLabel>
                      <Input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => handleChange('login', 'password', e.target.value)}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                        _hover={{ borderColor: 'brand.300' }}
                      />
                    </FormControl>

                    <Button 
                      type="submit" 
                      colorScheme="blue" 
                      width="full"
                      size="lg"
                      borderRadius="xl"
                      fontWeight="600"
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                      transition="all 0.2s">
                      Sign In
                    </Button>
                    <Button 
                      variant="outline" 
                      colorScheme="gray" 
                      width="full" 
                      size="lg"
                      borderRadius="xl"
                      fontWeight="600"
                      onClick={() => signInWithGoogle(false, navigate, toast)} 
                      leftIcon={<FcGoogle />}
                      _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
                      transition="all 0.2s">
                      Sign in with Google
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
};

export default AuthForm;
