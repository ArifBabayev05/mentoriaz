import { getImageUrl } from '../utils/apiConfig';

const ProfileImage = ({ imagePath }) => {
  return <img src={getImageUrl(imagePath)} alt="Profile" />;
}; 