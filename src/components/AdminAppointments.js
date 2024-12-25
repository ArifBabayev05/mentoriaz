import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../utils/apiConfig';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.ADMIN.APPOINTMENTS.LIST);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
    try {
      const response = await axiosInstance.delete(ENDPOINTS.ADMIN.APPOINTMENTS.DELETE(id));
      if (response.status === 200) {
        setAppointments(appointments.filter((appointment) => appointment._id !== id));
        toast({ title: 'Appointment deleted.', status: 'success', duration: 5000, isClosable: true });
      }
    } catch (error) {
      toast({ title: 'Error deleting appointment.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Appointments</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Mentor</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map((appointment) => (
            <Tr key={appointment._id}>
              <Td>{appointment?.user?.name}</Td>
              <Td>{appointment.mentor}</Td>
              <Td>{new Date(appointment.date).toLocaleDateString()}</Td>
              <Td>{appointment.time}</Td>
              <Td>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteAppointment(appointment._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminAppointments;
