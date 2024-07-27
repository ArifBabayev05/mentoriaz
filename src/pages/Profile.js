import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, VStack, Heading, Divider } from '@chakra-ui/react';

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box w="md" mx="auto" mt="10" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack spacing="4">
        {profile.photo && <Image src={`http://localhost:5000${profile.photo}`} alt="Profile Photo" boxSize="150px" objectFit="cover" borderRadius="full" />}
        <Heading as="h2" size="lg">{profile.user.name} {profile.user.surname}</Heading>
        <Text>{profile.description}</Text>
        <Divider />
        <Text><strong>Experience:</strong> {profile.experience}</Text>
        <Text><strong>Education:</strong> {profile.education}</Text>
        {profile.isMentor && (
          <>
            <Divider />
            <Text><strong>Skills:</strong> {profile.skills.join(', ')}</Text>
            <Text><strong>Instagram:</strong> {profile.socialMedia.instagram}</Text>
            <Text><strong>Facebook:</strong> {profile.socialMedia.facebook}</Text>
            <Text><strong>LinkedIn:</strong> {profile.socialMedia.linkedin}</Text>
            {profile.passportPhoto && <Image src={`http://localhost:5000${profile.passportPhoto}`} alt="Passport Photo" boxSize="150px" objectFit="cover" />}
          </>
        )}
        <Divider />
        <Text><strong>Interests:</strong> {profile.interests.join(', ')}</Text>
      </VStack>
    </Box>
  );
};

export default Profile;
