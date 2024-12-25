import { useApiUrl } from '../hooks/useApiUrl';

const ImageDisplay = ({ path }) => {
  const imageUrl = useApiUrl(path);
  return <img src={imageUrl} alt="Display" />;
}; 