import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Image,
  video,
} from '@chakra-ui/react';

const AdminVerify = () => {
  const [profiles, setProfiles] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('http://localhost:5000/api/admin/profiles');
      const data = await response.json();
      // Filter profiles where isVerificated value is '2'
      setProfiles(data.filter(profile => profile.isVerificated === '2'));
    };

    fetchProfiles();
  }, []);

  const handleUpdateVerification = async (id, newStatus) => {
    const response = await fetch(`http://localhost:5000/api/admin/profiles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVerificated: newStatus }),
    });

    if (response.ok) {
      setProfiles(profiles.filter(profile => profile._id !== id));
      toast({ title: `Profile ${newStatus === '1' ? 'accepted' : 'declined'}.`, status: 'success', duration: 5000, isClosable: true });
    } else {
      toast({ title: 'Error updating profile.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Verify Profiles</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Passport Photo</Th>
            <Th>Video</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {profiles.map((profile) => (
            <Tr key={profile._id}>
              <Td>{profile?.user?.name}</Td>
              <Td>
                {profile.passportPhoto && (
                  <Image
                    src={`http://localhost:5000${profile.passportPhoto}`}
                    alt="Passport Photo"
                    boxSize="100px"
                    objectFit="cover"
                  />
                )}
              </Td>
              <Td>
                {profile.video && (
                  <video
                    src={`http://localhost:5000${profile.video}`}
                    width="150"
                    controls
                  />
                )}
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleUpdateVerification(profile._id, '1')}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleUpdateVerification(profile._id, '0')}
                  ml={2}
                >
                  Decline
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminVerify;
