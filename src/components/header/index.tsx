import React, { memo } from 'react';
import styles from './styles.module.scss';
import Logo from '@/app/icons/LogoIcon';
import avatar from '@/app/images/avatar.png';
import Image from 'next/image';
import useFirebaseUser from '@/hooks/useFirebaseUser';
import { Popover } from 'antd';
import UserInfo from './userInfo';

const Header = () => {
	const user = useFirebaseUser();

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Logo width="50" height="50" />
				<h1>Letter</h1>
			</div>
			{user && (
				<div className={styles.avatarContainer}>
					<div className={styles.avatar}>
						<Popover placement="bottomLeft" content={<UserInfo />}>
							<Image
								src={user.photoURL || avatar}
								layout="fill"
								alt="Letter avatar"
							/>
						</Popover>
					</div>
					<h2>{user.displayName || ''}</h2>
				</div>
			)}
		</header>
	);
};

export default memo(Header);
