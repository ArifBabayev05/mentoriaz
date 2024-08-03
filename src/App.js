import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';  
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SearchMentors from './pages/SearchMentors';
import ScheduleAppointment from './pages/ScheduleAppointment';
import Payment from './pages/Payment';
import ComplaintForm from './pages/ComplaintForm';
import Footer from './components/Footer';
import AuthForm from './pages/AuthForm';
import Header from './components/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/" element={<Home />} />
          <Route 
            path="*" 
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/edit-profile/:userId" element={<EditProfile />} />
                  <Route path="/search-mentors" element={<SearchMentors />} />
                  <Route path="/schedule-appointment/:mentorId" element={<ScheduleAppointment />} />
                  <Route path="/complaint" element={<ComplaintForm />} />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
