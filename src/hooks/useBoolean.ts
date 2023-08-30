import { useCallback, useState } from 'react';

const useBoolean = () => {
	const [open, setOpen] = useState(false);

	const setTrue = useCallback(() => {
		setOpen(true);
	}, [setOpen]);
	const setFalse = useCallback(() => setOpen(false), [setOpen]);
	const setToggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);

	return {
		state: open,
		setTrue,
		setFalse,
		setToggle,
	};
};

export default useBoolean;
