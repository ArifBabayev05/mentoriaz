import React from 'react';
import { Box, Heading, Text, Button, HStack, Image, Flex, Badge, Wrap, WrapItem } from '@chakra-ui/react';
import images from '../helpers/imageLoader';

const mentors = [
  {
    name: 'Dmitry Kovalev',
    title: 'Senior Software Engineer',
    skills: ['C#', 'SQL', 'Python'],
    sessions: 14,
    reviews: 6,
    image: 'b.png',
  },
  {
    name: 'Maria Jarova',
    title: 'CEO & Founder at Flower Studio',
    skills: ['Hiring a team', 'Analytics'],
    sessions: 20,
    reviews: 12,
    image: 'bb.png',
  },
  {
    name: 'Oleg Dubrovin',
    title: 'Senior Software Engineer',
    skills: ['C#', 'SQL', 'JavaScript'],
    sessions: 8,
    reviews: 9,
    image: 'c.png',
  },
  {
    name: 'Darya Ermakova',
    title: 'Data Scientist',
    skills: ['Python', 'SQL', 'ML'],
    newMentor: true,
    image: 'v.png',
  },
  {
    name: 'Nikita Smirnov',
    title: 'UI/UX Researcher',
    skills: ['Miro', 'Power BI'],
    image: 'q.png',
  },
  {
    name: 'Olga Safronova',
    title: 'IT Recruiter',
    skills: ['Hiring a team'],
    image: 'q.png',
  },
  {
    name: 'Yegor Volkov',
    title: 'Senior Software Engineer',
    skills: ['C#', 'SQL', 'Python'],
    image: 'v.png',
  },
  {
    name: 'Maxim Rogov',
    title: 'Senior Software Engineer',
    skills: [], // Empty skills array to test robustness
    image: 'a.png',
  },
];

const filters = ['UI/UX', 'Design', 'Marketing', 'Product', 'Java', 'Mobile', 'C++', 'Data Science', 'Python'];

const MentorCard = ({ mentor }) => (
  <Box bg="white" p={6} rounded="md" shadow="md" textAlign="left" maxW="sm" m={4}>
    <Image src={images[mentor.image]} alt={mentor.name} borderRadius="full" mb={4} boxSize="100px" objectFit="cover" mx="auto" />
    <Heading as="h3" size="md" mb={2}>{mentor.name}</Heading>
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
);

const FindMentorSection = () => {
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
        {mentors.slice(0, 8).map(mentor => (
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
