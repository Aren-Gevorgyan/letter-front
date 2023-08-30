/* eslint-disable no-console */
import {
	GoogleAuthProvider,
	RecaptchaVerifier,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPhoneNumber,
	signInWithPopup,
	updatePassword,
} from 'firebase/auth';
import auth from './firebaseInit';
import Cookies from 'universal-cookie';
import Router from 'next/router';
import { notification } from 'antd';
import { DefaultError, Errors } from './errors';

type SetTokenOptions = {
	expires: Date;
	path: string;
};
const cookies = new Cookies();
const JWT_NAME = 'firebase-jwt';
const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/sign-in` || '';
export const getToken = (): string => cookies.get(JWT_NAME);
const setToken = (token: string | undefined, options: SetTokenOptions): void =>
	cookies.set(JWT_NAME, token, options);
const deleteToken = (): void => cookies.remove(JWT_NAME, { path: '/' });

const setTokenCookie = (token: string | undefined): void => {
	const expirationDate = new Date();
	// Change 1 for the number of days you want to let this cookie exist
	expirationDate.setDate(expirationDate.getDate() + 1);
	const options = { path: '/', expires: expirationDate };
	setToken(token, options);
};

const getCookie = (cookieData: any, dataName: string): string => {
	const name = `${dataName}=`;
	const ca = cookieData?.split(';');
	if (ca)
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
		}
	return '';
};

export const getHeader = (
	cookie?: Cookies,
	options?: any,
): { header: { Authorization: string } } => {
	const jwt = cookie ? getCookie(cookie, JWT_NAME) : getToken();
	return {
		header: {
			Authorization: `Bearer ${jwt}`,
			...options,
		},
	};
};

export const registration = async (email: string, password: string) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		auth.currentUser && sendEmailVerification(auth.currentUser, { url });
		Router.push('/sign-in');
	} catch (error: any) {
		notification.open({
			message: 'Error',
			description: Errors[error.message] || DefaultError,
		});
	}
};

export const signIn = async (email: string, password: string): Promise<any> => {
	try {
		const data: any = await signInWithEmailAndPassword(auth, email, password);
		setTokenCookie(data.user.accessToken);
		if (!data.user.emailVerified) {
			await auth.signOut();
			throw Error('Please verify email');
		}
		Router.push('/message/5');
		return data.user;
	} catch (error: any) {
		notification.open({
			message: 'Error',
			description: Errors[error.message] || DefaultError,
		});
	}
};

export const registerWithPhoneNumber = async (phoneNumber: string) => {
	try {
		const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
			size: 'visible',
			callback: (response: string) => {
				// This will be called after reCAPTCHA verification is successful
				setTokenCookie(response);
			},
		});

		const confirmationResult = await signInWithPhoneNumber(
			auth,
			phoneNumber,
			recaptchaVerifier,
		);

		// Prompt the user to enter the verification code
		const verificationCode = window.prompt('Enter verification code:') || '';
		const userCredential = await confirmationResult.confirm(verificationCode);

		// User is registered
		const user: any = userCredential.user;
		setTokenCookie(user.accessToken);
		Router.push('/message/5');
		console.log('User registered with phone number:', user);
	} catch (error: any) {
		console.error('Error during phone number registration:', error.message);
		notification.open({
			message: 'Error',
			description: Errors[error.message] || DefaultError,
		});
	}
};

export const authByGoogle = async (): Promise<void> => {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		setTokenCookie((user as any).accessToken);
		Router.push('/message/5');
	} catch (error) {
		console.log('Login by Google: ', error);
	}
};

export const signOut = async (): Promise<void> => {
	await auth.signOut();
	deleteToken();
	Router.push('/sign-in');
};

export const resetCurrentPassword = async (email: string): Promise<void> => {
	await sendPasswordResetEmail(auth, email, { url });
};

export const changePassword = async (newPassword: string): Promise<void> => {
	const user = auth.currentUser;
	if (user) {
		await updatePassword(user, newPassword);
	}
};
