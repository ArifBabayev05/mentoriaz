import { useMemo } from 'react';
import { API_BASE_URL } from '../utils/apiConfig';

export const useApiUrl = (path) => {
  return useMemo(() => {
    if (!path) return '';
    return `${API_BASE_URL}${path}`;
  }, [path]);
}; 