import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

const MentorCards = ({ profile }) => {
    const gridTemplateColumns = () => {
        const cardCount = profile.cards.length;

        if (cardCount === 1) return "repeat(1, 100%)";
        if (cardCount === 2) return "repeat(2, 1fr)";
        if (cardCount >= 3) return "repeat(4, 1fr)"; // En fazla 4 sütun olacak şekilde

        return "repeat(auto-fill, minmax(100px, 1fr))"; // Varsayılan olarak responsive
    };

    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
            {profile.cards.map((card, index) => (
                <Box
                    key={index}
                    borderWidth={1}
                    borderRadius="lg"
                    p={4}
                    boxShadow="lg"
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.05)" }}
                >
                    <Heading size="md" mb={2}>{card.name}</Heading>
                    <Text mb={1}>{card.description}</Text>
                    <Text fontWeight="bold" color="teal.500">Price: {card.price}</Text>
                    <Text color="gray.500">Time: {card.time}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};
