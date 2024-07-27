import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Textarea } from '@chakra-ui/react';

const EditProfile = () => {
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [socialMedia, setSocialMedia] = useState({ instagram: '', facebook: '', linkedin: '' });
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [passportPhoto, setPassportPhoto] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const response = await fetch(`http://localhost:5000/api/profile/${userInfo._id}`);
      const data = await response.json();

      setPhoto(data.photo || '');
      setDescription(data.description || '');
      setExperience(data.experience || '');
      setEducation(data.education || '');
      setSocialMedia(data.socialMedia || { instagram: '', facebook: '', linkedin: '' });
      setInterests((data.interests || []).join(', '));
      setSkills((data.skills || []).join(', '));
      setPassportPhoto(data.passportPhoto || '');
      setIsMentor(userInfo.isMentor || false); // Kullanıcının mentor olup olmadığını kontrol et
    };

    fetchProfile();
  }, []);

  const handleFileUpload = async (e, setState) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setState(data.filePath);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userInfo._id, photo, description, experience, education, socialMedia, interests, skills, passportPhoto }),
    });

    if (response.ok) {
      navigate('/dashboard');
    } else {
      console.error('Error updating profile');
    }
  };

  return (
    <Box w="md" mx="auto" mt="10">
      <form onSubmit={submitHandler}>
        <VStack spacing="4">
          <FormControl id="photo">
            <FormLabel>Photo</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFileUpload(e, setPhoto)}
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="experience">
            <FormLabel>Experience</FormLabel>
            <Textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </FormControl>

          <FormControl id="education">
            <FormLabel>Education</FormLabel>
            <Input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </FormControl>

          {isMentor && (
            <>
              <FormControl id="instagram">
                <FormLabel>Instagram</FormLabel>
                <Input
                  type="text"
                  value={socialMedia.instagram}
                  onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                />
              </FormControl>

              <FormControl id="facebook">
                <FormLabel>Facebook</FormLabel>
                <Input
                  type="text"
                  value={socialMedia.facebook}
                  onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                />
              </FormControl>

              <FormControl id="linkedin">
                <FormLabel>LinkedIn</FormLabel>
                <Input
                  type="text"
                  value={socialMedia.linkedin}
                  onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                />
              </FormControl>

              <FormControl id="skills">
                <FormLabel>Skills</FormLabel>
                <Input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </FormControl>

              <FormControl id="passportPhoto">
                <FormLabel>Passport Photo</FormLabel>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(e, setPassportPhoto)}
                />
              </FormControl>
            </>
          )}

          <FormControl id="interests">
            <FormLabel>Interests</FormLabel>
            <Input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Update Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditProfile;
