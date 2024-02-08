import { io } from 'socket.io-client';

// Replace 'http://localhost:3001' with the actual URL of your Socket.IO server
const socket = io('http://localhost:8081/chat');

export default socket;