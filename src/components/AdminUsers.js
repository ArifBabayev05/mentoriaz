import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5000/api/admin/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setUsers(users.filter(user => user._id !== id));
      toast({
        title: "User deleted.",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } else {
      toast({
        title: "Error deleting user.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Users</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user._id}>
              <Td>{user?.name}</Td>
              <Td>{user?.email}</Td>
              <Td>
                <Button size="sm" colorScheme="red" onClick={() => deleteUser(user._id)}>
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

export default AdminUsers;
