import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import io from 'socket.io-client';

const socket = io('/');  // Adjust according to your deployment

const Meeting = () => {
  const { roomId } = useParams();
  const myVideoRef = useRef(null);
  const videoGridRef = useRef(null);
  const peers = useRef({});
  const [isCallStarted, setIsCallStarted] = useState(false); // New state to control call start

  useEffect(() => {
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '3001',  // Ensure this matches your PeerJS server setup
      path: '/peerjs' // Adjust according to your PeerJS setup
    });

    socket.on('user-disconnected', userId => {
      if (peers.current[userId]) peers.current[userId].close();
    });

    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    return () => {
      myPeer.destroy();
      socket.disconnect();
    };
  }, [roomId]);

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      const myVideo = myVideoRef.current;
      myVideo.muted = true;
      addVideoStream(myVideo, stream);

      const myPeer = new Peer(undefined, {
        host: '/',
        port: '3001',
        path: '/peerjs'
      });

      myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream, myPeer);
      });

      setIsCallStarted(true);
    }).catch(error => {
      console.error('Error accessing media devices:', error);
    });
  };

  function connectToNewUser(userId, stream, myPeer) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });

    peers.current[userId] = call;
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    videoGridRef.current.append(video);
  }

  return (
    <div>
      <h1>Meet</h1>
      <div ref={videoGridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 300px)', gridAutoRows: '300px' }}></div>
      <video ref={myVideoRef} style={{ display: 'none' }}></video>
      {!isCallStarted && (
        <button onClick={startCall} style={{ marginTop: '20px' }}>Start Meeting</button>
      )}
    </div>
  );
};

export default Meeting;
