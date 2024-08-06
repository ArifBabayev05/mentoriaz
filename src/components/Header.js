import React, {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Avatar,
    IconButton,
    Button,
    Spacer,
    Container,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Image
} from '@chakra-ui/react';
import {SearchIcon, BellIcon} from '@chakra-ui/icons';
import {Link, useNavigate} from 'react-router-dom';
import logo from "../assets/images/mentor-main.png";
const Header = () => {
    const [profile,
        setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async() => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`http://localhost:5000/api/profile/${userInfo._id}`);
            const data = await response.json();
            setProfile(data);
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
                    <Flex align="center">
                        <Link style={{"display":"flex"}} to="/user-home-page">
                            <Image src={logo} alt="Mentoriaz Logo" boxSize="40px" mr={2}/>
                            <Text fontSize="xl" style={{"display":"flex", "align-items":"center"}} fontWeight="bold" color="black.500">Mentoriaz</Text>
                        </Link>
                    </Flex>
                    <Spacer/>
                    <InputGroup maxW="400px" mx={4}>
                        <InputRightElement
                            pointerEvents="none"
                            children={< SearchIcon color = "gray.500" />}/>
                        <Input type="text" placeholder="Enter a skill or goal"/>
                    </InputGroup>
                    <IconButton
                        aria-label="Notifications"
                        icon={< BellIcon />}
                        variant="ghost"
                        mx={2}/>
                    <Menu>
                        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
                            <Avatar
                                size="sm"
                                zIndex={10}
                                src={profile
                                ?.photo
                                    ? `http://localhost:5000${profile.photo}`
                                    : `https://cdn-icons-png.freepik.com/512/147/147142.png`}/>
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
