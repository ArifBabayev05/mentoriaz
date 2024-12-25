import { io } from 'socket.io-client';
import { API_BASE_URL } from '../utils/apiConfig';
import Peer from 'peerjs';

const socket = io(API_BASE_URL, {
  withCredentials: true
});

const peer = new Peer({
  host: process.env.REACT_APP_API_URL.replace(/^https?:\/\//, ''),
  port: process.env.NODE_ENV === 'production' ? 443 : 5000,
  secure: process.env.NODE_ENV === 'production'
});
