import { Button } from 'antd';
import React from 'react';
import { memo } from 'react';
import GoogleIcon from '../../app/icons/GoogleIcon';
import styles from './styles.module.scss';
import { authByGoogle } from '@/common/auth';

const LoginWhiteGoogle = () => {
	return (
		<Button className={styles.container} onClick={authByGoogle}>
			<div>
				<GoogleIcon />
				<span>Continue with Google</span>
			</div>
		</Button>
	);
};

export default memo(LoginWhiteGoogle);
