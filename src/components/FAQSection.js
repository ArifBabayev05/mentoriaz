import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Stack } from '@chakra-ui/react';

const questions = [
  'Məsləhət almaq necə mümkündür?',
  'İnsanlar bizə nə üçün gəlir?',
  'Eksperti necə seçmək olar?',
  'Məsləhət başlamazdan əvvəl məndən nə tələb olunur?',
  'Məsləhəti hədiyyə edə bilərəmmi?',
  'Məsləhətdən sonra məni nə gözləyir?',
];

const FAQSection = () => {
  return (
    <Box mt={20} textAlign="left" width={{ base: '90%', md: '80%', lg: '60%' }} mx="auto">
      <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="start">
        <VStack align="start" spacing={4} flex="1">
          <Text fontSize="sm" color="blue.500">Tez-tez verilən suallar</Text>
          <Heading as="h3" size="lg">Hələ də suallarınız varmı?</Heading>
          <Text fontSize="md" color="gray.600">
            Suallarınızı menecerimizə verin və pulsuz məsləhət alın.
          </Text>
          <Button variant="outline" colorScheme="blue" mt={4}>
            Sual ver
          </Button>
        </VStack>
        <Box flex="2">
          <Accordion allowToggle>
            {questions.map((question, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontSize="md" p={4}>
                      {question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="md" p={4}>
                  {`Suallara cavab: ${question}`}
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
