import { GetServerSidePropsContext, GetServerSideProps } from 'next';

const withCSR =
	(next: GetServerSideProps) =>
	async (ctx: GetServerSidePropsContext): Promise<any> => {
		const isCSR = ctx.req.url?.startsWith('/_next');
		if (isCSR) return { props: {} };
		//Call the callback of withCSR by next fun.
		const ssrData = await next(ctx);
		const ifReturnProps = 'props' in ssrData;
		const cookie = ctx?.req.headers.cookie || null;

		if (ifReturnProps && cookie) {
			const props = {
				...ssrData.props,
				cookie,
			};
			return { ...ssrData, props };
		}

		return {
			redirect: {
				permanent: false,
				destination: '/signIn',
			},
		};
	};

export default withCSR;
