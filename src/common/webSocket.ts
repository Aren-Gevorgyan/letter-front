import { io } from 'socket.io-client';
import { getHeader } from './auth';
import { Cookie } from 'universal-cookie';

export const connectToSocket = (cookie?: Cookie) => {
	const { header } = getHeader(cookie);

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const socket = io(`${serverUrl}`, {
		extraHeaders: {
			Authorization: header.Authorization,
		},
	});

	return socket;
};
