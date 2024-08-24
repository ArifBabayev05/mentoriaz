import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, FormControl, FormLabel, Input, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const AdminProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [description, setDescription] = useState('');
  const [speciality, setSpeciality] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('http://localhost:5000/api/admin/profiles');
      const data = await response.json();
      setProfiles(data);
      
    };

    fetchProfiles();
  }, []);

  const handleCreateOrUpdateProfile = async () => {
    const method = selectedProfile ? 'PUT' : 'POST';
    const url = selectedProfile ? `http://localhost:5000/api/admin/profiles/${selectedProfile._id}` : 'http://localhost:5000/api/admin/profiles';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, speciality }),
    });

    if (response.ok) {
      const profile = await response.json();
      if (selectedProfile) {
        setProfiles(profiles.map((p) => (p._id === profile._id ? profile : p)));
        toast({ title: 'Profile updated.', status: 'success', duration: 5000, isClosable: true });
      } else {
        setProfiles([...profiles, profile]);
        toast({ title: 'Profile created.', status: 'success', duration: 5000, isClosable: true });
      }
      onClose();
    } else {
      toast({ title: 'Error saving profile.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  const handleDeleteProfile = async (id) => {
    const response = await fetch(`http://localhost:5000/api/admin/profiles/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProfiles(profiles.filter((profile) => profile._id !== id));
      toast({ title: 'Profile deleted.', status: 'success', duration: 5000, isClosable: true });
    } else {
      toast({ title: 'Error deleting profile.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  const openModalForUpdate = (profile) => {
    setSelectedProfile(profile);
    setDescription(profile.description);
    setSpeciality(profile.speciality);
    onOpen();
  };

  const openModalForCreate = () => {
    setSelectedProfile(null);
    setDescription('');
    setSpeciality('');
    onOpen();
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Profiles</Heading>
      <Button colorScheme="blue" mb={4} onClick={openModalForCreate}>
        Create New Profile
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Statusu</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {profiles.map((profile) => (
            <Tr key={profile._id}>
              <Td>{profile?.user?.name}</Td>
              <Td>{profile.isMentor ? 'Mentor' : 'Istifadəçi'}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" onClick={() => openModalForUpdate(profile)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteProfile(profile._id)} ml={2}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProfile ? 'Update Profile' : 'Create New Profile'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Speciality</FormLabel>
                <Input value={speciality} onChange={(e) => setSpeciality(e.target.value)} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreateOrUpdateProfile}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminProfiles;
