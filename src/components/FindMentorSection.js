import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, HStack, Image, Flex, Badge, Wrap, WrapItem } from '@chakra-ui/react';
import {Link} from 'react-router-dom';

const filters = ['UI/UX', 'Design', 'Marketing', 'Product', 'Java', 'Mobile', 'C++', 'Data Science', 'Python', 'C++', 'Data Science', 'Python'];

const MentorCard = ({ mentor }) => {
  return (
    <Box as={Link} to={`/profile/${mentor.user._id}`} bg="white" p={6} rounded="md" shadow="sm" textAlign="left" maxW="sm" m={4}>
      <Image 
        src={mentor.photo ? `http://localhost:5000${mentor.photo}` : `https://cdn-icons-png.freepik.com/512/147/147142.png`} 
        alt={mentor.user.name} 
        borderRadius="full" 
        mb={4} 
        boxSize="120px" 
        objectFit="cover" 
        mx="auto" 
      />
      <Heading as="h3" size="md" mb={2}>{mentor.user.name}</Heading>
      <Text fontSize="sm" color="gray.600" mb={2}>{mentor.title}</Text>

      {mentor.specialty && (
        <WrapItem key={mentor.specialty}>
          <Text mb="2" color="gray.600" mr={1}>{mentor.specialty}</Text>
        </WrapItem>
      )}

      {mentor.skills && mentor.skills.length > 0 && (
        <Wrap>
          {mentor.skills.map(skill => (
            <WrapItem key={skill}>
              <Badge colorScheme="blue" mr={1}>{skill}</Badge>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
};

const FindMentorSection = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      const response = await fetch('http://localhost:5000/api/mentors/all');
      const data = await response.json();
      setMentors(data);
    };

    fetchMentors();
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter.toLowerCase()); // Normalize to lowercase
  };

  const toggleFilterVisibility = () => {
    if (showAllFilters) {
      // Hide additional filters and clear the selected filter
      setShowAllFilters(false);
      setSelectedFilter(null);
    } else {
      // Show additional filters
      setShowAllFilters(true);
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    if (!selectedFilter) return true; // If no filter is selected, show all mentors

    return mentor.skills?.some(skill => skill.toLowerCase() === selectedFilter); // Check if any skill matches the filter
  });

  // Split filters into visible and hidden parts
  const visibleFilters = filters.slice(0, 7);
  const hiddenFilters = filters.slice(7);

  return (
    <Box mt={20} textAlign="center" width={{ base: '90%', md: '70%', lg: '70%' }} mx="auto">
      <Text fontSize="lg" color="gray.600">Mentorlarımız</Text>
      <Heading as="h2" size="xl" mt={4} mb={6} fontWeight="bold">
        Sahənə uyğun mentoru seç
      </Heading>

      <Box 
        overflowX="auto" 
        whiteSpace="nowrap" 
        mb={10} 
        px={4} 
        css={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }} // Thin scrollbar
        maxWidth="100%"
      >
        <HStack spacing="4" justify="center" flexWrap="wrap"  align="center" textAlign="center" minWidth="max-content">
          {visibleFilters.map(filter => (
            <Button
              key={filter}
              variant={selectedFilter === filter.toLowerCase() ? 'solid' : 'outline'}
              colorScheme="blue"
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </Button>
          ))}
          {showAllFilters && hiddenFilters.map(filter => (
            <Button
              key={filter}
              variant={selectedFilter === filter.toLowerCase() ? 'solid' : 'outline'}
              colorScheme="blue"
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </Button>
          ))}
        </HStack>
      </Box>

      <Button 
        variant="outline" 
        colorScheme="blue" 
        onClick={toggleFilterVisibility}
        mb={10}
      >
        {showAllFilters ? 'Daha az' : `+${hiddenFilters.length} daha çox seçim`}
      </Button>

      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        {filteredMentors.slice(0, 8).map(mentor => (
          <MentorCard key={mentor.user.name} mentor={mentor} />
        ))}
      </Flex>

      <Button colorScheme="blue" size="lg" mt={10}>
        Mentorunu tap →
      </Button>
    </Box>
  );
};

export default FindMentorSection;
