import React from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
    return (
        <HStack>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <IconButton
                        key={index}
                        icon={<FaStar color={ratingValue <= rating ? "gold" : "gray"} />}
                        onClick={() => setRating(ratingValue)}
                        variant="ghost"
                        size="lg"
                        aria-label={`${ratingValue} stars`}
                    />
                );
            })}
        </HStack>
    );
};

export default StarRating;
