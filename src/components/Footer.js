import React from 'react';
import { Box, Text, HStack, VStack, Link, Button, IconButton, Image, Stack, Flex, Spacer } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import images from '../helpers/imageLoader';

const Footer = () => {
  return (
    <Box bg="white" py={10} mt={10}>
      <Flex direction={{ base: 'column', md: 'row' }} align="start" spacing={8} justify="space-between" mb={6} w={{ base: '90%', md: '80%' }} mx="auto">
        <VStack align="start" spacing={4} flex="1" mb={{ base: 8, md: 0 }}>
          <HStack align="center">
            <Image src={images['mentor-main.png']} alt="Mentoriaz Logo" boxSize="50px" />
            <Text fontSize="1xl" fontWeight="bold">Mentoriaz</Text>
          </HStack>
          <Text fontSize="md" color="gray.600">Mentee is a unique mentoring platform where your goals become a reality</Text>
          <Button colorScheme="blue">Find a mentor →</Button>
        </VStack>
        <VStack align="start" spacing={4} flex="1" mb={{ base: 8, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">About the Service</Text>
          <Link href="#">Find a Mentor</Link>
          <Link href="#">Become a Mentor</Link>
        </VStack>
        <VStack align="start" spacing={4} flex="1" mb={{ base: 8, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">About the Company</Text>
          <Link href="#">Reviews</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">Support</Link>
        </VStack>
        <HStack spacing={4} flex="1" justify={{ base: 'center', md: 'start' }}>
          <IconButton as={Link} href="#" icon={<EmailIcon />} isRound="true" size="lg" aria-label="Email" />
          <IconButton as={Link} href="#" icon={<PhoneIcon />} isRound="true" size="lg" aria-label="Phone" />
          <IconButton as={Link} href="#" icon={<InfoOutlineIcon />} isRound="true" size="lg" aria-label="Info" />
        </HStack>
      </Flex>
      <Text fontSize="sm" color="gray.500" textAlign="center">© 2024 OOO «Mentoriaz»</Text>
      <HStack spacing={4} justify="center" mt={4}>
        <Link href="#" fontSize="sm" color="gray.500">Privacy Policy</Link>
        <Link href="#" fontSize="sm" color="gray.500">Offer</Link>
        <Link href="#" fontSize="sm" color="gray.500">User Agreement</Link>
      </HStack>
    </Box>
  );
};

export default Footer;
