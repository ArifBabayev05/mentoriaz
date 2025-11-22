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
  IconButton,
  Flex
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { useLoading } from '../helpers/loadingContext';
import { getApiUrl, getImageUrl } from '../utils/apiConfig';

const MentorCard = ({ mentor, onSchedule }) => (
  <Box 
    bg="white" 
    w="full" 
    p={{ base: 4, md: 6 }} 
    borderRadius="2xl" 
    shadow="lg" 
    mb={4}
    border="1px solid"
    borderColor="gray.200"
    transition="all 0.3s"
    _hover={{
      shadow: "xl",
      transform: "translateY(-4px)",
      borderColor: "brand.200"
    }}>
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      spacing={6}
      align={{ base: 'center', md: 'start' }}
      gap={4}>
      <Avatar 
        src={mentor?.photo ? getImageUrl(mentor.photo) : 'https://via.placeholder.com/150'} 
        alt={mentor?.user?.name} 
        size={{ base: "xl", md: "2xl" }}
        border="3px solid"
        borderColor="brand.100"
      />
      <VStack align={{ base: 'center', md: 'start' }} spacing={3} flex="1" w="full">
        <HStack w="full" justify="space-between" flexWrap="wrap">
          <Link to={`/profile/${mentor.user._id}`}>
            <Heading as="h3" size="md" fontWeight="700" _hover={{ color: 'brand.500' }}>
              {mentor?.user?.name}
            </Heading>
          </Link>
          <IconButton
            aria-label="Bookmark"
            icon={<FaBookmark />}
            variant="ghost"
            size="md"
            borderRadius="full"
            _hover={{ bg: 'brand.50', color: 'brand.500' }}
          />
        </HStack>
        <Badge colorScheme="gray" px={3} py={1} borderRadius="full" fontWeight="600">
          {mentor?.speciality}
        </Badge>
        <HStack spacing={2} mt={2} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
          {mentor?.skills?.slice(0, 4).map((skill) => (
            <Badge key={skill} colorScheme="blue" px={2} py={1} borderRadius="full" fontSize="xs">
              {skill}
            </Badge>
          ))}
        </HStack>
        <Text fontSize="sm" color="gray.500" mt={2} textAlign={{ base: 'center', md: 'left' }}>
          Available sessions • 50 min
        </Text>
        <Button 
          colorScheme="blue" 
          size="md" 
          mt={4}
          borderRadius="xl"
          fontWeight="600"
          w={{ base: 'full', md: 'auto' }}
          onClick={() => onSchedule(mentor.user._id)}
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s">
          Schedule Session
        </Button>
      </VStack>
    </Flex>
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
    const fetchMentors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(getApiUrl('/api/mentors/all'));
        if (!response.ok) throw new Error('Failed to fetch mentors');
        const data = await response.json();
        setMentors(data);
        setFilteredMentors(data); // Initialize filtered mentors with all mentors
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, [setIsLoading]);


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
    <Box bg="gray.50" minH="100vh" py={{ base: 6, md: 10 }}>
      <Container maxW="8xl">
        <VStack spacing={6} align="start" mb={8}>
          <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800">
            Find Your Perfect Mentor
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Discover mentors who match your goals and interests
          </Text>
        </VStack>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }} gap={8}>
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <Box
              position={{ base: 'static', lg: 'sticky' }}
              top={4}
            >
              <VStack 
                align="start" 
                spacing={4} 
                bg="white" 
                p={6} 
                borderRadius="2xl" 
                shadow="lg"
                border="1px solid"
                borderColor="gray.200">
                <Heading as="h2" size="md" mb={2} fontWeight="700">
                  Filters
                </Heading>
                <VStack spacing={4} w="full">
                  <Input
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                    _hover={{ borderColor: 'brand.300' }}
                  />
                  <Input
                    placeholder="Search by interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                    _hover={{ borderColor: 'brand.300' }}
                  />
                  <Input
                    placeholder="Search by skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor="gray.200"
                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                    _hover={{ borderColor: 'brand.300' }}
                  />
                  <Button 
                    colorScheme="blue" 
                    w="full" 
                    onClick={filterMentors}
                    borderRadius="xl"
                    fontWeight="600"
                    size="lg"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.2s">
                    Apply Filters
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 9 }}>
            <VStack spacing={4} align="stretch">
              {filteredMentors.length === 0 ? (
                <Box 
                  bg="white" 
                  p={12} 
                  borderRadius="2xl" 
                  textAlign="center"
                  shadow="sm"
                  border="1px solid"
                  borderColor="gray.200">
                  <Text fontSize="lg" color="gray.600" fontWeight="600">
                    No mentors found for your criteria
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Try adjusting your filters
                  </Text>
                </Box>
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
