// components/Messenger.js

import { signOut } from '@/common/auth';
import useSocket from '@/hooks/useSocket';
import { Button } from 'antd';
import { Cookie } from 'universal-cookie';
import styles from './styles.module.scss';

const Messenger = ({ cookie }: { cookie: Cookie }) => {
	const { messages, messageInput, error, handleSendMessage, onChange } = useSocket(cookie);

	return (
		<div>
			<Button onClick={signOut}>Log out</Button>
			<div>
				{messages.map((message: any, index: number) => (
					<div key={index}>{message}</div>
				))}
			</div>
			<input type="text" value={messageInput} onChange={onChange} />
			{error && <p className={styles.error}>{error}</p>}
			<button disabled={!!error} onClick={handleSendMessage}>
				Send
			</button>
		</div>
	);
};

export default Messenger;
