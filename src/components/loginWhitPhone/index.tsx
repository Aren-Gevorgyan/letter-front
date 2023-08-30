import React, { FC } from 'react';
import { memo } from 'react';
import { Button, Form, Input } from 'antd';
import { registerWithPhoneNumber } from '@/common/auth';
import useBoolean from '@/hooks/useBoolean';
import { PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

type FieldType = {
	phone?: string;
};

const WhitPhone: FC = () => {
	const { state: showPhoneInput, setTrue, setFalse } = useBoolean();

	const onFinish = async ({ phone }: { phone: string }) => {
		await registerWithPhoneNumber(`+${phone}`);
		setFalse();
	};

	return (
		<div>
			<div>
				<Button className={styles.item} onClick={setTrue}>
					<div>
						<PhoneOutlined className={styles.phone} />
						<span>Phone</span>
					</div>
				</Button>
			</div>
			{showPhoneInput && (
				<>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						autoComplete="off"
					>
						<p>Phone</p>
						<Form.Item<FieldType>
							name="phone"
							rules={[{ required: true, message: 'Please input your phone number!' }]}
						>
							<Input placeholder="Phone" />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
					<div id="recaptcha-container" />
				</>
			)}
		</div>
	);
};

export default memo(WhitPhone);
