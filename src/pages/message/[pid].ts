import withCSR from '@/dependencies/with-CSR';
import Messenger from '@/screens/messages';

export default Messenger;

export const getServerSideProps = withCSR(async () => {
	try {
		return {
			props: {},
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(`Reader page error: ${error}`);
		return { props: {} };
	}
});
