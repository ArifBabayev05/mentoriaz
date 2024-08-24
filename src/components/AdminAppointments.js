import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('http://localhost:5000/api/admin/appointments');
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
    const response = await fetch(`http://localhost:5000/api/admin/appointments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      toast({ title: 'Appointment deleted.', status: 'success', duration: 5000, isClosable: true });
    } else {
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
