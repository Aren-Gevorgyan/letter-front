import Header from '@/components/header';
import './styles/globals.css';
import { FC } from 'react';

type PropTypes = { children: React.ReactNode };

const RootLayout: FC<PropTypes> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default RootLayout;
