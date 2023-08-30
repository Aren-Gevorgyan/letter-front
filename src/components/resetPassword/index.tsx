import React, { memo } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { resetCurrentPassword } from '@/common/auth';
import { rulesEmail } from '@/common/rules';
import styles from './styles.module.scss';
import useBoolean from '@/hooks/useBoolean';

type FieldType = {
	email?: string;
};

const ResetPassword = () => {
	const { state, setTrue, setFalse } = useBoolean();
	const onFinish = async (values: { email: string }) => {
		await resetCurrentPassword(values.email);
		setFalse();
	};

	return (
		<div>
			<Button onClick={setTrue}>Reset password</Button>
			{state && (
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<p>Email</p>
					<Form.Item<FieldType> name="email" className={styles.email} rules={rulesEmail}>
						<Input placeholder="Email" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Reset
						</Button>
					</Form.Item>
					<Link href="/sign-in">Sign in</Link>
				</Form>
			)}
		</div>
	);
};

export default memo(ResetPassword);
