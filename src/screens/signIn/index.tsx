import React, { FC } from 'react';
import LoginWhitEmailAndPass from '@/components/loginWhitEmailAndPass';
import LoginWhiteGoogle from '@/components/loginWhiteGoogle';
import LoginWhitPhone from '@/components/loginWhitPhone';
import ResetPassword from '@/components/resetPassword';
import { signIn } from '@/common/auth';

const SignIn: FC = () => {
	return (
		<>
			<LoginWhiteGoogle />
			<LoginWhitPhone />
			<LoginWhitEmailAndPass
				submitButtonText="Sign in"
				redirectText="Registration"
				redirectUrl="/registration"
				callBack={signIn}
			/>
			<ResetPassword />
		</>
	);
};

export default SignIn;
