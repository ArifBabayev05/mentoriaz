import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import images from '../helpers/imageLoader';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMentor, setIsMentor] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          isMentor: isMentor === 'yes',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage={`url(${images['a.png']})`}
      bgSize="cover"
      bgPosition="center"
      p={4}
    >
      <Box
        bg="white"
        p={6}
        rounded="lg"
        shadow="lg"
        maxW={{ base: '90%', sm: '70%', md: '50%', lg: '35%' }}
        width="100%"
      >
        <VStack spacing={6} align="stretch">
          <Image src={images['mentor-main.png']} alt="Mentoriaz Logo" boxSize="60px" mx="auto" />
          <Heading as="h2" fontSize="30px" textAlign="center">
            Mentoriaz
          </Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Register</Tab>
              <Tab>Log In</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form onSubmit={submitHandler}>
                  <VStack spacing={4} align="stretch">
                    <FormControl id="name" isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl id="surname" isRequired>
                      <FormLabel>Surname</FormLabel>
                      <Input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </FormControl>

                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <FormControl id="isMentor" isRequired>
                      <FormLabel>Are you a Mentor?</FormLabel>
                      <Select
                        placeholder="Select option"
                        value={isMentor}
                        onChange={(e) => setIsMentor(e.target.value)}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Select>
                    </FormControl>

                    <Button type="submit" colorScheme="teal" width="full">
                      Register
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  {/* Log In form elements here */}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
