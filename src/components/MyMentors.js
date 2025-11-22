// components/MyMentors.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../utils/apiConfig';

const MyMentors = ({ currentUser }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(getApiUrl(`/api/users/${currentUser._id}/mentors`));
        if (!response.ok) throw new Error('Failed to fetch mentors');
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    if (currentUser?._id) {
      fetchMentors();
    }
  }, [currentUser]);

  return (
    <VStack spacing={4} align="start">
      <Divider my={4} />
      <Heading as="h3" size="lg">
        My Mentors
      </Heading>
      {mentors.map((mentor, index) => (
        <Box key={index} p={4} bg="gray.100" borderRadius="md" w="full">
          <HStack spacing={4}>
            <Avatar src={mentor.photo} alt={mentor.name} />
            <VStack align="start">
              <Link to={`/profile/${mentor._id}`}>
                <Text fontSize="lg" fontWeight="bold">
                  {mentor.name}
                </Text>
              </Link>
              <Text fontSize="sm" color="gray.500">
                {mentor.speciality}
              </Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default MyMentors;
