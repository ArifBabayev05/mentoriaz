import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, HStack, Image, Flex, Badge, Wrap, WrapItem } from '@chakra-ui/react';
import images from '../helpers/imageLoader';

const filters = ['UI/UX', 'Design', 'Marketing', 'Product', 'Java', 'Mobile', 'C++', 'Data Science', 'Python'];

const MentorCard = ({ mentor }) => {

  const imageSrc = images[mentor.image] || "https://www.svgrepo.com/show/5125/avatar.svg";

  return (
  <Box bg="white" p={6} rounded="md" shadow="md" textAlign="left" maxW="sm" m={4}>
    <Image src={imageSrc} alt={mentor.name} borderRadius="full" mb={4} boxSize="100px" objectFit="cover" mx="auto" />
    <Heading as="h3" size="md" mb={2}>{mentor.user.name}</Heading>
    <Text fontSize="sm" color="gray.600" mb={2}>{mentor.title}</Text>
    {mentor.skills && mentor.skills.length > 0 && (
      <Wrap>
        {mentor.skills.map(skill => (
          <WrapItem key={skill}>
            <Badge colorScheme="blue" mr={1}>{skill}</Badge>
          </WrapItem>
        ))}
      </Wrap>
    )}
    {mentor.sessions && (
      <Text fontSize="sm" mt={2} color="gray.600">
        ⭐ {mentor.sessions} sessions ({mentor.reviews} reviews)
      </Text>
    )}
    {mentor.newMentor && (
      <Text fontSize="sm" mt={2} color="gray.600">
        ⭐ New mentor
      </Text>
    )}
  </Box>
)};

const FindMentorSection = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const response = await fetch('http://localhost:5000/api/mentors/all');
      const data = await response.json();
      setMentors(data);
    };

    fetchMentors();
  }, []);

  return (
    <Box mt={20} textAlign="center" width={{ base: '90%', md: '70%', lg: '70%' }} mx="auto">
      <Text fontSize="lg" color="gray.600">Our Mentors</Text>
      <Heading as="h2" size="xl" mt={4} mb={6} fontWeight="bold">
        Find your specialist among 1000+ experts
      </Heading>
      <HStack spacing={4} justify="center" mb={10} flexWrap="wrap">
        {filters.map(filter => (
          <Button key={filter} variant="outline" colorScheme="blue">
            {filter}
          </Button>
        ))}
      </HStack>

      <Flex justifyContent="center" alignItems="center" flexWrap="wrap" >
        {mentors?.slice(0, 8).map(mentor => (
          <MentorCard key={mentor.name} mentor={mentor} />
        ))}
      </Flex>

      <Button colorScheme="blue" size="lg" mt={10}>
        Find a mentor →
      </Button>
    </Box>
  );
};

export default FindMentorSection;
