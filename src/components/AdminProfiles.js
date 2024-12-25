import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, FormControl, FormLabel, Input, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../utils/apiConfig';

const AdminProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [description, setDescription] = useState('');
  const [speciality, setSpeciality] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.ADMIN.PROFILES.LIST);
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleCreateOrUpdateProfile = async () => {
    try {
      const url = selectedProfile 
        ? ENDPOINTS.ADMIN.PROFILES.UPDATE(selectedProfile._id)
        : ENDPOINTS.ADMIN.PROFILES.LIST;

      const response = await axiosInstance({
        method: selectedProfile ? 'PUT' : 'POST',
        url,
        data: { description, speciality }
      });

      if (response.status === 200) {
        if (selectedProfile) {
          setProfiles(profiles.map((p) => (p._id === response.data._id ? response.data : p)));
          toast({ title: 'Profile updated.', status: 'success', duration: 5000, isClosable: true });
        } else {
          setProfiles([...profiles, response.data]);
          toast({ title: 'Profile created.', status: 'success', duration: 5000, isClosable: true });
        }
        onClose();
      }
    } catch (error) {
      toast({ title: 'Error saving profile.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      const response = await axiosInstance.delete(ENDPOINTS.ADMIN.PROFILES.DELETE(id));
      if (response.status === 200) {
        setProfiles(profiles.filter((profile) => profile._id !== id));
        toast({ title: 'Profile deleted.', status: 'success', duration: 5000, isClosable: true });
      }
    } catch (error) {
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
