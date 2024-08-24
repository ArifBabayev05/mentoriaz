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
import UserHomePage from './pages/UserHomePage';
import MentorSearch from './pages/MentorSearch';
import AdminDashboard from './pages/AdminDashboard';
import VideoMeetingPage from './pages/Meeting';
import Meeting from './pages/Meeting';

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
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/user-home-page" element={<UserHomePage />} />

                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/edit-profile/:userId" element={<EditProfile />} />
                  {/* <Route path="/search-mentors" element={<SearchMentors />} /> */}
                  <Route path="/schedule-appointment/:mentorId" element={<ScheduleAppointment />} />
                  <Route path="/complaint" element={<ComplaintForm />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/search-mentors" element={<MentorSearch />} />

                  <Route path="/:roomId" element={<Meeting />} />
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
