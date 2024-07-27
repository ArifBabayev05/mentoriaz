import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, List, ListItem, Text, HStack } from '@chakra-ui/react';

const SearchMentors = () => {
  const [search, setSearch] = useState('');
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  const searchMentors = async () => {
    const response = await fetch(`http://localhost:5000/api/mentors/search?search=${search}`);
    const data = await response.json();
    setMentors(data);
  };

  const handleSchedule = (mentorId) => {
    navigate(`/schedule-appointment/${mentorId}`);
  };

  return (
    <Box w="md" mx="auto" mt="10">
      <VStack spacing="4">
        <FormControl id="search">
          <FormLabel>Search Mentors</FormLabel>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={searchMentors}>
          Search
        </Button>
        <List spacing="3">
          {mentors.map((mentor) => (
            <ListItem key={mentor._id}>
              <Text fontSize="lg">{mentor.name}</Text>
              <Text>{mentor.profile?.bio}</Text>
              <Text>Interests: {mentor.profile?.interests?.join(', ')}</Text>
              <HStack>
                <Button colorScheme="teal" onClick={() => handleSchedule(mentor._id)}>
                  Schedule Appointment
                </Button>
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default SearchMentors;
