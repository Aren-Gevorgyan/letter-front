// components/Messenger.js

import { connectTOSocket } from '@/common/webSocket';
import { useEffect, useState } from 'react';
import { Cookie } from 'universal-cookie';

const Messenger = ({ cookie }: { cookie: Cookie }) => {
	const [messages, setMessages] = useState<any>([]);
	const [messageInput, setMessageInput] = useState('');
	const socket = connectTOSocket(cookie);

	useEffect(() => {
		socket.on('connect', () => {
			// eslint-disable-next-line no-console
			console.log('connected to Socket io');
		});

		socket.on('message', (data) => {
			setMessages((prevMessages: any) => [...prevMessages, data]);
		});

		return () => {
			// eslint-disable-next-line no-console
			console.log('Disconnect');
			socket.disconnect();
		};
	}, [socket]);

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

	return (
		<div>
			<div>
				{messages.map((message: any, index: number) => (
					<div key={index}>{message}</div>
				))}
			</div>
			<input type="text" value={messageInput} onChange={onChange} />
			<button onClick={handleSendMessage}>Send</button>
		</div>
	);
};

export default Messenger;
