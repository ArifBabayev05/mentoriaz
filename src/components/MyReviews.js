// components/MyReviews.js
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  IconButton,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Heading,
} from '@chakra-ui/react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const MyReviews = ({
  reviews,
  currentUser,
  handleDeleteReview,
  filteredReviews,
  filterRating,
  setFilterRating,
  showMoreReviews,
  visibleReviews,
  handleAddReview,
  newReview,
  setNewReview,
  rating,
  setRating,
}) => {
  return (
    <VStack spacing={4} align="start">
      {/* Add Review Form */}
      <FormControl id="new-review">
        <FormLabel>Add Your Review</FormLabel>
        <StarRating rating={rating} setRating={setRating} />
        <Textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <Button colorScheme="blue" onClick={handleAddReview} mt={4}>
          Submit Review
        </Button>
      </FormControl>
      <Divider my={4} />

      {/* Filter and Review List */}
      <Heading as="h3" size="lg">
        Reviews
      </Heading>
      <Select
        placeholder="Filter by Rating"
        onChange={(e) => setFilterRating(parseInt(e.target.value))}
        width="200px"
      >
        <option value="0">All</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </Select>
      {filteredReviews.slice(0, visibleReviews).map((review, index) => (
        <Box key={index} p={4} bg="gray.100" borderRadius="md" w="full">
          <HStack justify="space-between">
            <Text>{review.text}</Text>
            <HStack>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < review.rating ? 'gold' : 'gray'} />
              ))}
            </HStack>
            {currentUser._id === review.user._id && (
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                variant="outline"
                onClick={() => handleDeleteReview(review._id)}
              />
            )}
          </HStack>
          <Link to={`/profile/${review.user._id}`}>
            <Text fontSize="sm" color="gray.500">
              {review.user.name}
            </Text>
          </Link>
        </Box>
      ))}
      {visibleReviews < filteredReviews.length && (
        <Button onClick={showMoreReviews} variant="outline" mt={4}>
          Show More
        </Button>
      )}
    </VStack>
  );
};

export default MyReviews;
