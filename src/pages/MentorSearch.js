import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Select,
  Button,
  Avatar,
  Badge,
  Stack,
  IconButton
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { useLoading } from '../helpers/loadingContext';

const MentorCard = ({ mentor, onSchedule }) => (
  <Box bg="white" w="full" p={6} rounded="lg" shadow="md" mb={4}>
    <HStack spacing={6}>
      <Avatar src={mentor?.photo ? `http://localhost:5000${mentor.photo}` : 'https://via.placeholder.com/150'} alt={mentor?.user?.name} size="2xl" />
      <VStack align="start" spacing={2} flex="1">
        <HStack w="full" justify="space-between">
          <Link to={`/profile/${mentor.user._id}`}>
            <Heading as="h3" size="md">
              {mentor?.user?.name}
            </Heading>
          </Link>
          <IconButton
            aria-label="Bookmark"
            icon={<FaBookmark />}
            variant="ghost"
            size="lg"
          />
        </HStack>
        <Text fontSize="md" color="gray.600">
          {mentor?.speciality}
        </Text>
        <HStack spacing={2} mt={2}>
          {mentor?.skills?.map((skill) => (
            <Badge key={skill} colorScheme="blue">
              {skill}
            </Badge>
          ))}
        </HStack>
        <HStack spacing={2} mt={2}>
          {mentor?.interests?.map((interest) => (
            <Badge key={interest} colorScheme="yellow">
              {interest}
            </Badge>
          ))}
        </HStack>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Available sessions March 10:00 • 50 min
        </Text>
        <Button colorScheme="blue" size="sm" mt={4} onClick={() => onSchedule(mentor.user._id)}>
          Choose session time
        </Button>
      </VStack>
    </HStack>
  </Box>
);

const MentorSearch = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [search, setSearch] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    try{
      setIsLoading(true);
      const fetchMentors = async () => {
        const response = await fetch('http://localhost:5000/api/mentors/all');
        const data = await response.json();
        setMentors(data);
        setFilteredMentors(data); // Initialize filtered mentors with all mentors
      };
  
      fetchMentors();
    }
    catch{}
    finally{
      setIsLoading(false);

    }
    

  }, []);


  const handleSchedule = (mentorId) => {
    navigate(`/schedule-appointment/${mentorId}`);
  };

  const filterMentors = () => {
    let filtered = mentors;

    if (search) {
      filtered = filtered.filter(mentor =>
        mentor.user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (interests) {
      const interestArray = interests.split(',').map(interest => interest.trim().toLowerCase());
      filtered = filtered.filter(mentor =>
        mentor.interests.some(interest => interestArray.includes(interest.toLowerCase()))
      );
    }

    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim().toLowerCase());
      filtered = filtered.filter(mentor =>
        mentor.skills.some(skill => skillsArray.includes(skill.toLowerCase()))
      );
    }

    setFilteredMentors(filtered);
  };

  return (
    <Box bg="gray.100" minH="100vh" py={10}>
      <Container maxW="8xl">
        <Heading as="h1" size="xl" mb={6}>
          Best matches for you
        </Heading>
        <Grid templateColumns="repeat(12, 1fr)" gap={8}>
          <GridItem colSpan={3}>
            <VStack align="start" spacing={4} bg="white" p={4} rounded="md" shadow="md">
              <Heading as="h2" size="md" mb={4}>
                Filters
              </Heading>
              <Input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Input
                placeholder="Search by interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
              <Input
                placeholder="Search by skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
         
              <Button colorScheme="blue" w="full" onClick={filterMentors}>
                Show results
              </Button>
            </VStack>
          </GridItem>
          <GridItem colSpan={9}>
            <VStack spacing={4}>
            {filteredMentors.length === 0 ? (
                <Text>No mentors found for your criteria</Text>
              ) : (
                filteredMentors.map((mentor) => (
                  <MentorCard key={mentor._id} mentor={mentor} onSchedule={handleSchedule} />
                ))
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default MentorSearch;
