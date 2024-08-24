import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const VideoChat = ({ roomId }) => {
  const videoGridRef = useRef();
  const myVideoRef = useRef();
  const peersRef = useRef({});

  useEffect(() => {
    const socket = io('/');
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '3000',
    });

    myVideoRef.current.muted = true;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      addVideoStream(myVideoRef.current, stream);

      myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream, myPeer, socket);
      });
    });

    socket.on('user-disconnected', userId => {
      if (peersRef.current[userId]) peersRef.current[userId].close();
    });

    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    return () => {
      socket.disconnect();
      myPeer.destroy();
    };
  }, [roomId]);

  const connectToNewUser = (userId, stream, myPeer, socket) => {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });

    peersRef.current[userId] = call;
  };

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    videoGridRef.current.append(video);
  };

  return (
    <div id="video-grid" ref={videoGridRef}>
      <video ref={myVideoRef}></video>
    </div>
  );
};

export default VideoChat;
