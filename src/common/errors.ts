type ErrorsDataType = { [key: string]: string };

export const Errors: ErrorsDataType = {
	'Firebase: Error (auth/wrong-password).': 'Make sure you have entered the correct password',
	'Firebase: Error (auth/user-not-found).': 'Make sure you have entered the correct Email',
};

export const DefaultError = 'Something went wrong';
