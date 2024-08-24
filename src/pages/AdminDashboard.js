import React from 'react';
import { Box, Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AdminUsers from '../components/AdminUsers';
import AdminProfiles from '../components/AdminProfiles';
import AdminReviews from '../components/AdminReviews';
import AdminAppointments from '../components/AdminAppointments';


const AdminDashboard = () => {
  return (
    <Container maxW="8xl" mt={10}>
      <Heading mb={6}>Admin Dashboard</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Users</Tab>
          <Tab>Profiles</Tab>
          <Tab>Reviews</Tab>
          <Tab>Appointments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminUsers />
          </TabPanel>
          <TabPanel>
            <AdminProfiles />
          </TabPanel>
          <TabPanel>
            <AdminReviews />
          </TabPanel>
          <TabPanel>
            <AdminAppointments />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
