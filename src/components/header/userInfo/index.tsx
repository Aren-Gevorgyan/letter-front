import React, { FC, memo } from 'react';
import styles from './styles.module.scss';
import avatar from '@/app/images/avatar.png';
import Image from 'next/image';
import useFirebaseUser from '@/hooks/useFirebaseUser';
import { Button } from 'antd';
import { signOut } from '@/common/auth';

const UserInfo: FC = () => {
	const user = useFirebaseUser();

	return (
		<>
			<div className={styles.avatar}>
				<div className={styles.imageContainer}>
					<Image src={user?.photoURL || avatar} layout="fill" alt="Letter avatar" />
				</div>
				<div className={styles.info}>
					<h3>{user?.displayName || ''}</h3>
					<h3>{user?.email || ''}</h3>
				</div>
			</div>
			<Button className={styles.signOut} onClick={signOut}>
				Sign out
			</Button>
		</>
	);
};

export default memo(UserInfo);
