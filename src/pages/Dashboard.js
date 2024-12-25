import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateAppointment = async (appointmentData) => {
    try {
      const response = await axios.post('/api/appointments/create', appointmentData);
      if (response.data.success) {
        // Redirect to payment page with appointment data
        navigate('/payment', { 
          state: { 
            appointmentData: {
              ...appointmentData,
              appointmentId: response.data.appointmentId
            }
          }
        });
      }
    } catch (error) {
      console.error('Appointment creation failed:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Mentoriaz</h1>
    </div>
  );
};

export default Dashboard;
