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
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../helpers/imageLoader';
import { googleProvider, signInWithPopup, auth } from '../helpers/firebaseConfig';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMentor, setIsMentor] = useState('');
  const navigate = useNavigate();

  const submitRegisterHandler = async (e) => {
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
      toast.success('Uğurla qeydiyyatdan keçdiniz!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Something went wrong');
      }
      

      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Uğurla daxil oldunuz!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(`Error1: ${error.message}`);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('userInfo', JSON.stringify(user));
      toast.success('Uğurla daxil olundu!');

      // Kullanıcıyı veritabanına kaydetmek için backend API'ye istek gönderin
      const response = await fetch('http://localhost:5000/api/auth/google-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      navigate('/dashboard');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage={`url(${images['background.png']})`}
      bgSize="cover"
      bgPosition="center"
      p={4}
    >
      <ToastContainer />
      <Box
        bg="white"
        p={6}
        rounded="lg"
        shadow="lg"
        maxW={{ base: '90%', sm: '70%', md: '50%', lg: '35%' }}
        width="100%"
      >
        <VStack spacing={6} align="stretch">
          <Image src={images['mentor-main.png']} alt="Mentoriaz Logo" boxSize="100px" mx="auto" />
          <Heading as="h2" size="xl" textAlign="center">
            Mentoriaz
          </Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Qeydiyyat</Tab>
              <Tab>Giriş</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form onSubmit={submitRegisterHandler}>
                  <VStack spacing={4} align="stretch">
                    <FormControl id="name" isRequired>
                      <FormLabel>Ad</FormLabel>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl id="surname" isRequired>
                      <FormLabel>Soyad</FormLabel>
                      <Input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </FormControl>

                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl id="password" isRequired>
                      <FormLabel>Şifrə</FormLabel>
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <FormControl id="isMentor" isRequired>
                      <FormLabel>Mentor olaraq qeydiyyatdan keçirsiniz?</FormLabel>
                      <Select
                        value={isMentor}
                        onChange={(e) => setIsMentor(e.target.value)}
                      >
                        <option value="no">Xeyr</option>
                        <option value="yes">Bəli</option>
                      </Select>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" width="full">
                      Qeydiyyatdan keçin
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={submitLoginHandler}>
                  <VStack spacing={4} align="stretch">
                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>

                    <FormControl id="password" isRequired>
                      <FormLabel>Şifrə</FormLabel>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>

                    <Button type="submit" colorScheme="teal" width="full">
                      Daxil olun
                    </Button>
                    <Button colorScheme="red" width="full" onClick={signInWithGoogle}>
                      Google ilə daxil olun
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
