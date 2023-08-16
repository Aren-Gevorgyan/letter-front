import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIRBASE_API_KAY,
	authDomain: process.env.NEXT_PUBLIC_FIRBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIRBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIRBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIRBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIRBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIRBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app };
export default auth;
