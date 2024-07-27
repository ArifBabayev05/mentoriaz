import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Stack } from '@chakra-ui/react';

const questions = [
  'How to Get a Consultation?',
  'What do people come to us for?',
  'How to choose an expert?',
  'What is required of me before the consultation starts?',
  'Can I gift a consultation?',
  'What awaits me after the consultation?',
];

const FAQSection = () => {
  return (
    <Box mt={20} textAlign="left" width={{ base: '90%', md: '80%', lg: '60%' }} mx="auto">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="start">
        <VStack align="start" spacing={4} flex="1">
          <Text fontSize="sm" color="blue.500">FAQ</Text>
          <Heading as="h3" size="lg">Still have questions?</Heading>
          <Text fontSize="md" color="gray.600">
            Ask them to our manager and get a free consultation.
          </Text>
          <Button variant="outline" colorScheme="blue" mt={4}>
            Ask a question
          </Button>
        </VStack>
        <Box flex="2">
          <Accordion allowToggle>
            {questions.map((question, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Answer to the question: {question}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Stack>
    </Box>
  );
};

export default FAQSection;
