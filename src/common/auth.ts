import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
const url = `${process.env.NEXT_PUBLIC_HOSTNAME}sign-in` || '';
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
		const user = await createUserWithEmailAndPassword(auth, email, password);
		console.log('🚀 ~ file: auth.ts:7 ~ registration ~ user:', user);
	} catch (error: any) {
		console.log(error.message);
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
		Router.push('messages/5');
		return data.user;
	} catch (error: any) {
		console.log('🚀 ~ file: auth.ts:75 ~ signIn ~ error:', error.message);
		notification.open({
			message: 'Error',
			description: Errors[error.message] || DefaultError,
		});
	}
};
