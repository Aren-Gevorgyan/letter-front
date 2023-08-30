import React, { FC } from 'react';
import styles from './styles.module.scss';
import LoginWhiteGoogle from '@/components/loginWhiteGoogle';
import LoginWhitPhone from '@/components/loginWhitPhone';
import LoginWhitEmailAndPass from '@/components/loginWhitEmailAndPass';
import { registration } from '@/common/auth';

const Registration: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<LoginWhiteGoogle />
				<LoginWhitPhone />
				<LoginWhitEmailAndPass
					submitButtonText="Registration"
					redirectText="Sign in"
					redirectUrl="/sign-in"
					callBack={registration}
				/>
			</div>
		</div>
	);
};

export default Registration;
