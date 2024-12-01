// Inside NotFound.js
import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      flexDirection="column" 
      height="100vh" 
      textAlign="center"
      bg="gray.50"
    >
      <Heading as="h1" size="2xl" color="red.500">
        404
      </Heading>
      <Text fontSize="xl" marginTop="4" color="gray.600">
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Image 
        src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--404-error-page-pack-network-communication-illustrations-6167023.png?f=webp" 
        alt="404 Image" 
        boxSize="300px" 
        objectFit="contain" 
        marginTop="6"
      />
      <Button 
        as={Link} 
        to="/" 
        colorScheme="teal" 
        size="lg" 
        marginTop="6"
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
