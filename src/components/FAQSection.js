import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Stack } from '@chakra-ui/react';

const questions = [
  {
    q: 'How can I get mentorship?',
    a: 'Simply sign up, browse our network of experienced mentors, and schedule a session that fits your needs.'
  },
  {
    q: 'Why do people come to us?',
    a: 'People choose Mentoriaz to accelerate their careers, gain industry insights, and receive personalized guidance from experts.'
  },
  {
    q: 'How do I choose an expert?',
    a: 'Browse mentors by industry, skills, and experience. Read reviews, check their profiles, and book a trial session.'
  },
  {
    q: 'What is required before starting a session?',
    a: 'Complete your profile, identify your goals, and prepare specific questions or topics you want to discuss.'
  },
  {
    q: 'Can I gift a mentorship session?',
    a: 'Yes! You can purchase mentorship sessions as gifts for friends, colleagues, or family members.'
  },
  {
    q: 'What happens after a mentorship session?',
    a: 'You\'ll receive session notes, action items, and can schedule follow-up sessions to track your progress.'
  },
];

const FAQSection = () => {
  return (
    <Box mt={20} textAlign="left" width={{ base: '90%', md: '80%', lg: '60%' }} mx="auto">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="start">
        <VStack align="start" spacing={4} flex="1">
          <Text fontSize="sm" color="brand.600" fontWeight="600" letterSpacing="0.1em" textTransform="uppercase">Frequently Asked Questions</Text>
          <Heading as="h3" size="lg" fontWeight="700">Still have questions?</Heading>
          <Text fontSize="md" color="gray.600" lineHeight="1.6">
            Send your questions to our team and get free advice from our experts.
          </Text>
          <Button variant="outline" colorScheme="blue" mt={4} fontWeight="600">
            Ask a Question
          </Button>
        </VStack>
        <Box flex="2">
          <Accordion allowToggle>
            {questions.map((question, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontSize="md" p={4} fontWeight="600">
                      {question.q}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="md" p={4} color="gray.600" lineHeight="1.6">
                  {question.a}
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
