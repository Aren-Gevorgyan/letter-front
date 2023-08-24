/* eslint-disable no-console */
import { signOut } from '@/common/auth';
import { connectToSocket } from '@/common/webSocket';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Cookie } from 'universal-cookie';

const useSocket = (cookie: Cookie) => {
	const [messages, setMessages] = useState<any>([]);
	const [messageInput, setMessageInput] = useState('');
	const { push } = useRouter();
	const [error, setError] = useState('');
	const socket = useMemo(() => connectToSocket(cookie), [cookie]);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected to Socket io');
		});

		socket.on('connectionError', (error) => {
			if (error.message === 'Authentication token not provided') signOut();
			setError(error.message);
			// Handle the error in your frontend, e.g., show an error message to the user
		});

		socket.on('message', (data: string) => {
			setMessages((prevMessages: any) => [...prevMessages, data]);
		});

		return () => {
			console.log('Disconnect');
			socket.disconnect();
		};
	}, [socket, push]);

	const handleSendMessage = () => {
		const newMessage = messageInput.trim();
		if (newMessage && socket) {
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
		error,
	};
};

export default useSocket;
