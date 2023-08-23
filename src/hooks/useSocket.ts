/* eslint-disable no-console */
import { connectToSocket } from '@/common/webSocket';
import { useEffect, useState } from 'react';
import { Cookie } from 'universal-cookie';

const useSocket = (cookie: Cookie) => {
	const [messages, setMessages] = useState<any>([]);
	const [messageInput, setMessageInput] = useState('');
	const socket = connectToSocket(cookie);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected to Socket io');
		});

		socket.on('message', (data: string) => {
			setMessages((prevMessages: any) => [...prevMessages, data]);
		});

		// return () => {
		// 	console.log(101);
		// 	console.log('Disconnect');
		// 	socket.disconnect();
		// };
	}, [socket]);

	const handleSendMessage = () => {
		const newMessage = messageInput.trim();
		if (newMessage && socket) {
			console.log('newMessage', 11231212);
			socket.emit('newMessage', newMessage);
			setMessageInput('');
		}
	};

	const onChange = (e: any) => {
		setMessageInput(e.target.value);
	};

	return {
		handleSendMessage,
		onChange,
		messages,
		messageInput,
	};
};

export default useSocket;
