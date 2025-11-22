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
import { getApiUrl, getImageUrl } from '../utils/apiConfig';
const Header = () => {
    
    const [profile,
        setProfile] = useState(null);


    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo._id) return;
                const response = await fetch(getApiUrl(`/api/profile/${userInfo._id}`));
                if (!response.ok) throw new Error('Failed to fetch profile');
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };
    const handleProfile = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        navigate('/profile/'+userInfo._id);
    };

    return (
        <Box 
            bg="rgba(255, 255, 255, 0.8)" 
            backdropFilter="blur(20px)"
            borderBottom="1px solid rgba(226, 232, 240, 0.8)"
            px={4} 
            py={3} 
            position="sticky"
            top={0}
            zIndex={1000}
            boxShadow="sm">
            <Container maxW="9xl">
                <Flex alignItems="center">
                    <Flex 
                        align="center" 
                        cursor="pointer" 
                        onClick={() => {
                            const userInfo = localStorage.getItem('userInfo');
                            if (userInfo) {
                                navigate('/user-home-page');
                            } else {
                                navigate('/');
                            }
                        }}
                        _hover={{ opacity: 0.8 }}
                        transition="opacity 0.2s">
                        <Image src={logo} alt="Mentoriaz Logo" boxSize="45px" mr={3} borderRadius="lg"/>
                        <Text
                            fontSize="xl"
                            fontWeight="700"
                            bgGradient="linear(to-r, brand.500, brand.700)"
                            bgClip="text"
                            letterSpacing="-0.02em">
                            Mentoriaz
                        </Text>
                    </Flex>
                    <Spacer/>
                    <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={6}>
                        <Link to="/search-mentors">
                            <Text 
                                mx={2} 
                                fontWeight="500" 
                                color="gray.700"
                                _hover={{ color: 'brand.500' }}
                                transition="color 0.2s">
                                Find Mentors
                            </Text>
                        </Link>
                        <Link to="/complaint">
                            <Text 
                                mx={2} 
                                fontWeight="500"
                                color="gray.700"
                                _hover={{ color: 'brand.500' }}
                                transition="color 0.2s">
                                Contact
                            </Text>
                        </Link>
                    </Flex>
                    <IconButton
                        aria-label="Notifications"
                        icon={<BellIcon />}
                        variant="ghost"
                        mx={2}
                        display={{ base: 'none', md: 'flex' }}
                        colorScheme="gray"
                        size="md"
                        borderRadius="full"/>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rounded="full" 
                            variant="link" 
                            cursor="pointer"
                            p={0}
                            minW={0}>
                            <Avatar
                                size="md"
                                src={profile?.photo
                                    ? getImageUrl(profile.photo)
                                    : `https://cdn-icons-png.freepik.com/512/147/147142.png`}
                                border="2px solid"
                                borderColor="brand.100"
                                _hover={{ borderColor: 'brand.400' }}
                                transition="all 0.2s"/>
                        </MenuButton>
                        <MenuList borderRadius="xl" boxShadow="xl" border="1px solid" borderColor="gray.200">
                            <MenuItem 
                                onClick={handleProfile}
                                borderRadius="lg"
                                _hover={{ bg: 'brand.50' }}>
                                Profile
                            </MenuItem>
                            <MenuItem 
                                onClick={handleLogout}
                                borderRadius="lg"
                                _hover={{ bg: 'red.50', color: 'red.600' }}>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
