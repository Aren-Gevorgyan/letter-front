import { useEffect, useState } from 'react';
import 'firebase/auth';
import auth from '@/common/firebaseInit';
import { User } from 'firebase/auth';

// Custom hook for getting the current user from Firebase
const useFirebaseUser = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Create an observer to listen for changes in authentication state
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// User is signed in
				setUser(authUser);
			} else {
				// No user signed in
				setUser(null);
			}
		});

		// Clean up the observer when the component unmounts
		return () => unsubscribe();
	}, []);

	return user;
};

export default useFirebaseUser;
