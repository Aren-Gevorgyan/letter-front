type ErrorsDataType = { [key: string]: string };

export const Errors: ErrorsDataType = {
	'Firebase: Error (auth/wrong-password).': 'Make sure you have entered the correct password',
	'Firebase: Error (auth/user-not-found).': 'Make sure you have entered the correct Email',
	'Firebase: Invalid format. (auth/invalid-phone-number).': 'Invalid phone number format',
};

export const DefaultError = 'Something went wrong';
