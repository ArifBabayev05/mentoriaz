import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../utils/apiConfig';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axiosInstance.get('/api/admin/reviews');
      const data = await response.data;
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    const response = await axiosInstance.delete(`/api/admin/reviews/${id}`);

    if (response.status === 200) {
      setReviews(reviews.filter((review) => review._id !== id));
      toast({ title: 'Review deleted.', status: 'success', duration: 5000, isClosable: true });
    } else {
      toast({ title: 'Error deleting review.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Reviews</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Review</Th>
            <Th>Rating</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reviews.map((review) => (
            <Tr key={review._id}>
              <Td>{review?.user?.name}</Td>
              <Td>{review?.text}</Td>
              <Td>{review?.rating}</Td>
              <Td>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteReview(review._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminReviews;
