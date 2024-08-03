import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Input, InputGroup, InputRightElement, Avatar, IconButton, Spacer, Container, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { SearchIcon, BellIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const response = await fetch(`http://localhost:5000/api/profile/${userInfo._id}`);
      const data = await response.json();
      setProfile(data);

      console.log("data")
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <Box bg="white" px={4} py={2} shadow="md">
      <Container maxW="9xl">
        <Flex alignItems="center">
          <Button as={Link} to="/" colorScheme="blue" size="sm">
            Get help
          </Button>
          <Spacer />
          <InputGroup maxW="400px" mx={4}>
            <InputRightElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
            <Input type="text" placeholder="Enter a skill or goal" />
          </InputGroup>
          <IconButton aria-label="Notifications" icon={<BellIcon />} variant="ghost" mx={2} />
          <Menu>
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
              <Avatar size="sm" zIndex={1} src={profile ? `http://localhost:5000${profile.photo}` : `https://cdn-icons-png.freepik.com/512/147/147142.png`}  />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
