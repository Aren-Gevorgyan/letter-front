// components/Messenger.js

import { WebSocketContext } from '@/common/webSocket';
import { useContext, useEffect, useState } from 'react';

const Messenger = () => {
	const [messages, setMessages] = useState<any>([]);
	const [messageInput, setMessageInput] = useState('');
	const socket = useContext(WebSocketContext);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected to Socket io');
		});

		socket.on('message', (data) => {
			setMessages((prevMessages: any) => [...prevMessages, data]);
		});

		return () => {
			console.log('Disconnect');
			socket.disconnect();
			socket.off('connect');
			socket.off('onMessage');
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
