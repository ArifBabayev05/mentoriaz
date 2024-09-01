// src/components/LoadingPage.js
import React from 'react';
import { Box, Center, Image } from '@chakra-ui/react';
import loadingGif from '../assets/images/loading.gif'; // Path to your loading GIF

const LoadingPage = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(255, 255, 255, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
    >
      <Image src={loadingGif} transform="scale(2)" alt="Loading..." boxSize="100px" />
    </Box>
  );
};

export default LoadingPage;
