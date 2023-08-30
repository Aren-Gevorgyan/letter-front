import './styles/globals.css';
import { FC } from 'react';

type PropTypes = { children: React.ReactNode };

const RootLayout: FC<PropTypes> = ({ children }) => {
	return <div>{children}</div>;
};

export default RootLayout;
