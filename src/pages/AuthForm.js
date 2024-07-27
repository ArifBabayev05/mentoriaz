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
  Divider,
  AbsoluteCenter
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../helpers/imageLoader';
import { signInWithGoogle } from '../helpers/firebaseConfig';

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
      const response = await fetch('http://localhost:5000/api/auth/register', {
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
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Successfully logged in!');
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
      p={4}>
      <ToastContainer />
      <Box
        bg="white"
        p={6}
        rounded="lg"
        shadow="lg"
        maxW={{
          base: '90%',
          sm: '70%',
          md: '50%',
          lg: '35%'
        }}
        width="100%">
        <VStack spacing={6} align="stretch">
          <Image
            src={images['mentor-main.png']}
            alt="Mentoriaz Logo"
            boxSize="100px"
            mx="auto" />
          <Heading as="h2" size="xl" textAlign="center">
            Mentoriaz
          </Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>İstifadəçi qeydiyyatı</Tab>
              <Tab>Mentor qeydiyyatı</Tab>
              <Tab>Daxil ol</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <form onSubmit={(e) => submitRegisterHandler(e, mentorForm, false)}>
              <VStack spacing={4} align="stretch">
                    <Button
                      variant="outline"
                      colorScheme="red"
                      width="full"
                      onClick={() => signInWithGoogle(false, navigate, toast)}
                      leftIcon={<FcGoogle />}>
                      Google ilə qeydiyyatdan keçin
                    </Button>

                    <Box position='relative' padding='5'>
                      <Divider />
                      <AbsoluteCenter bg='white' px='4'>
                        Və ya
                      </AbsoluteCenter>
                    </Box>
                    <FormControl id="user_name" isRequired>
                      <FormLabel>Ad</FormLabel>
                      <Input type="text" value={userForm.name} onChange={(e) => handleChange('user', 'name', e.target.value)} />
                    </FormControl>

                    <FormControl id="user_surname" isRequired>
                      <FormLabel>Soyad</FormLabel>
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
                      <FormLabel>Şifrə</FormLabel>
                      <Input
                        type="password"
                        value={userForm.password}
                        onChange={(e) => handleChange('user', 'password', e.target.value)} />
                    </FormControl>

                    {/* <FormControl id="user_isMentor" isRequired>
                      <FormLabel>Mentorsunuz?</FormLabel>
                      <Select value="no" isDisabled>
                        <option value="no">Xeyr</option>
                        <option value="yes">Bəli</option>
                      </Select>
                    </FormControl> */}

                    <Button type='submit' colorScheme="blue" width="full">
                      İstifadəçi kimi Qeydiyyatdan keçin
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
              <TabPanel>
              <form onSubmit={(e) => submitRegisterHandler(e, mentorForm, true)}>
                  <VStack spacing={4} align="stretch">
                    <Button
                      variant="outline"
                      colorScheme="red"
                      width="full"
                      onClick={() => signInWithGoogle(true, navigate, toast)}
                      leftIcon={<FcGoogle />}>
                      Google ilə qeydiyyatdan keçin
                    </Button>

                    <Box position='relative' padding='5'>
                      <Divider />
                      <AbsoluteCenter bg='white' px='4'>
                        Və ya
                      </AbsoluteCenter>
                    </Box>

                    <FormControl id="mentor_name" isRequired>
                      <FormLabel>Ad</FormLabel>
                      <Input type="text" value={mentorForm.name} onChange={(e) => handleChange('mentor', 'name', e.target.value)} />
                    </FormControl>

                    <FormControl id="mentor_surname" isRequired>
                      <FormLabel>Soyad</FormLabel>
                      <Input
                        type="text"
                        value={mentorForm.surname}
                        onChange={(e) => handleChange('mentor', 'surname', e.target.value)} />
                    </FormControl>

                    <FormControl id="mentor_email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" value={mentorForm.email} onChange={(e) => handleChange('mentor', 'email', e.target.value)} />
                    </FormControl>

                    <FormControl id="mentor_password" isRequired>
                      <FormLabel>Şifrə</FormLabel>
                      <Input
                        type="password"
                        value={mentorForm.password}
                        onChange={(e) => handleChange('mentor', 'password', e.target.value)} />
                    </FormControl>

                    {/* <FormControl id="mentor_isMentor" isRequired>
                      <FormLabel>Register as Mentor?</FormLabel>
                      <Select value="yes" isDisabled>
                        <option value="no">Xeyr</option>
                        <option value="yes">Bəli</option>
                      </Select>
                    </FormControl> */}
                    <Button type='submit' colorScheme="blue" width="full">
                     Mentor kimi Qeydiyyatdan keçin
                    </Button>
                  </VStack>
                </form>

              </TabPanel>
              <TabPanel>
                <form onSubmit={submitLoginHandler}>
                  <VStack spacing={4} align="stretch">
                    <FormControl id="login_email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" value={loginForm.email} onChange={(e) => handleChange('login', 'email', e.target.value)} />
                    </FormControl>

                    <FormControl id="login_password" isRequired>
                      <FormLabel>Şifrə</FormLabel>
                      <Input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => handleChange('login', 'password', e.target.value)} />
                    </FormControl>

                    <Button type="submit" colorScheme="teal" width="full">
                      Daxil olun
                    </Button>
                    <Button variant="outline" colorScheme="red" width="full" onClick={() => signInWithGoogle(false, navigate, toast)} leftIcon={<FcGoogle />}>
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
