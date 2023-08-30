import { emailRegex } from '@/common/regex';

export const rulesEmail = [
	{
		required: true,
		message: 'Please input your email!',
	},
	{
		pattern: emailRegex,
		message: 'Please enter a valid email address!',
	},
];
