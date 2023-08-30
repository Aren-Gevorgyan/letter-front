import React, { FC, memo } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';
import { rulesEmail } from '../../common/rules';

type FieldType = {
	email?: string;
	password?: string;
	remember?: string;
};

type Props = {
	submitButtonText: string;
	redirectText: string;
	redirectUrl: string;
	// eslint-disable-next-line no-unused-vars
	callBack: (email: string, password: string) => void;
};

const LoginWhitEmailAndPass: FC<Props> = ({
	submitButtonText,
	redirectText,
	redirectUrl,
	callBack,
}) => {
	const onFinish = (values: any) => {
		callBack(values.email, values.password);
	};

	return (
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
			<p>Password</p>
			<Form.Item<FieldType>
				name="password"
				className={styles.password}
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password placeholder="Password" />
			</Form.Item>

			<Form.Item<FieldType> name="remember" valuePropName="checked">
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					{submitButtonText}
				</Button>
			</Form.Item>
			<Link href={redirectUrl}>{redirectText}</Link>
		</Form>
	);
};

export default memo(LoginWhitEmailAndPass);
