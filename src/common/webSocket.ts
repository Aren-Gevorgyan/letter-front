import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const socket = io(`${serverUrl}`);
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
