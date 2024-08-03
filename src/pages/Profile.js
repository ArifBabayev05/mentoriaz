import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Text, VStack, Heading, Divider, HStack,Container, Tag, Button, Link, Icon, Progress, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Badge, Avatar } from '@chakra-ui/react';
import { EditIcon, InfoIcon } from '@chakra-ui/icons';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, [userId]);

  console.log(profile)
  if (!profile) {
    return <Text>Loading...</Text>;
  }


  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`);
  };

  const bannerPhotoPath = profile.bannerPhoto ? `http://localhost:5000${profile.bannerPhoto.replace(/\\/g, '/')}` : `https://www.pixelstalk.net/wp-content/uploads/2016/08/Background-Images-Full-HD-Wallpapers.jpg`;

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
        position="relative"
      />

      <Container maxW="8xl">

      <Stack direction={{ base: 'column', md: 'row' }} spacing={10} justify="center" align="center" px={4}>
        <Avatar
          src={profile.photo ? `http://localhost:5000${profile.photo}` : `https://cdn-icons-png.freepik.com/512/147/147142.png`}
          alt="Profile Photo"
          size="2xl"
          borderWidth={4}
          borderColor="white"
          mt="-75px"
        />
        <VStack spacing={1} align="start" flex="1">
          <Heading as="h2" size="lg">
            {profile.user.name}
          </Heading>
          <Text fontSize="lg">{profile.profession}</Text>
          <Text color="gray.500">Passport not verified</Text>
          <HStack spacing={4} mt={2}>
            {profile.socialMedia?.linkedin && (
              <Link href={profile.socialMedia.linkedin} isExternal>
                <Icon w={6} h={6} as={FaLinkedin} />
              </Link>
            )}
            {profile.socialMedia?.facebook && (
              <Link href={profile.socialMedia.facebook} isExternal>
                <Icon w={6} h={6} as={FaFacebook} />
              </Link>
            )}
            {profile.socialMedia?.instagram && (
              <Link href={profile.socialMedia.instagram} isExternal>
                <Icon w={6} h={6} as={FaInstagram} />
              </Link>
            )}
          </HStack>
        </VStack>
        <Button leftIcon={<EditIcon />} onClick={handleEditProfile} colorScheme="blue" variant="outline" mt={4} alignSelf={{ base: 'center', md: 'flex-start' }}>
          Edit profile
        </Button>
      </Stack>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={10} mt={10} justify="center">
      <VStack flex="3" spacing={4} align="start">
          <Tabs variant="enclosed" width="100%">
            <TabList>
              <Tab>About me</Tab>
              {profile.isMentor ? <Tab>Reviews</Tab> : <Tab>My mentors</Tab>}            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>{profile.description}</Text>
                <Divider my={4} />
                <Text fontSize="lg" fontWeight="bold">
                  Maraqlarınız
                </Text>
                <HStack spacing={4} wrap="wrap">
                  {profile.interests?.map((interests, index) => (
                    <Tag key={index} colorScheme="blue">
                      {interests}
                    </Tag>
                  ))}
                  <Button size="sm" variant="outline" onClick={handleEditProfile}>
                    + Add
                  </Button>
                </HStack>
                <Divider my={4} />
                <Text fontSize="lg" fontWeight="bold">
                  Skills
                </Text>
                <HStack spacing={4} wrap="wrap">
                  {profile.skills?.map((skill, index) => (
                    <Tag key={index} colorScheme="blue">
                      {skill}
                    </Tag>
                  ))}
                  <Button size="sm" variant="outline" onClick={handleEditProfile}>
                    + Add
                  </Button>
                </HStack>
                <Divider my={4} />
                <Text fontSize="lg" fontWeight="bold">
                  Experience
                </Text>
                <Text>{profile.experience}</Text>
                <Divider my={4} />
                <Text fontSize="lg" fontWeight="bold">
                  Education
                </Text>
                <Text>{profile.education}</Text>
              </TabPanel>
              <TabPanel>
                  {profile.isMentor ? (
                    <Text>Reviews content here</Text>
                  ) : (
                    <Text>My mentors content here</Text>
                  )}
                </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>

        <VStack flex="1" spacing={4} align="start">
          <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" w="full">
            <Text fontWeight="bold">Fill out Profile</Text>
            <Text color="gray.500">This will help mentors get to know you better</Text>
            <Progress value={38} size="sm" colorScheme="blue" mt={2} />
          </Box>
          <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" w="full">
            <Text fontWeight="bold">Achievements</Text>
            <Text color="gray.500">First Appointment with Mentor</Text>
          </Box>
        </VStack>
        
      </Stack>
      </Container>
    </Box>
  );
};

export default Profile;
