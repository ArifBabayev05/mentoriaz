import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import theme from './theme';  
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SearchMentors from './pages/SearchMentors';
import ScheduleAppointment from './pages/ScheduleAppointment';
import ComplaintForm from './pages/ComplaintForm';
import Footer from './components/Footer';
import AuthForm from './pages/AuthForm';
import Header from './components/Header';
import UserHomePage from './pages/UserHomePage';
import MentorSearch from './pages/MentorSearch';
import AdminDashboard from './pages/AdminDashboard';
import LoadingPage from './components/LoadingPage'; 
import { LoadingProvider, useLoading } from './helpers/loadingContext'; 
import VerifyProfile from './pages/VerifyProfile';
import NotFound from './pages/NotFound';
const AppContent = () => {
  const { isLoading } = useLoading();
  const userInfo = localStorage.getItem("userInfo");

  // Routes that don't need Header/Footer
  const publicRoutes = ['/', '/login', '/register'];
  
  return (
    <>
      {isLoading && <LoadingPage />}
      <Routes>
        {/* Public routes without header/footer */}
        <Route path="/login" element={userInfo ? <Navigate to={`/user-home-page`} replace /> : <AuthForm />} />
        <Route path="/register" element={userInfo ? <Navigate to={`/user-home-page`} replace /> : <AuthForm />} />
        <Route path="/" element={userInfo ? <Navigate to={`/user-home-page`} replace /> : <Home />} />
        
        {/* Protected routes with header/footer */}
        <Route path="/admin-dashboard" element={
          <>
            <Header />
            <AdminDashboard />
            <Footer />
          </>
        } />
        <Route path="/user-home-page" element={
          <>
            <Header />
            <UserHomePage />
            <Footer />
          </>
        } />
        <Route path="/profile/:userId" element={
          <>
            <Header />
            <Profile />
            <Footer />
          </>
        } />
        <Route path="/edit-profile/:userId" element={
          <>
            <Header />
            <EditProfile />
            <Footer />
          </>
        } />
        <Route path="/verify-profile/:userId" element={
          <>
            <Header />
            <VerifyProfile />
            <Footer />
          </>
        } />
        <Route path="/schedule-appointment/:mentorId" element={
          <>
            <Header />
            <ScheduleAppointment />
            <Footer />
          </>
        } />
        <Route path="/complaint" element={
          <>
            <Header />
            <ComplaintForm />
            <Footer />
          </>
        } />
        <Route path="/search-mentors" element={
          <>
            <Header />
            <MentorSearch />
            <Footer />
          </>
        } />
        <Route path="*" element={
          <>
            <Header />
            <NotFound />
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <Router>
          <AppContent />
        </Router>
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default App;
