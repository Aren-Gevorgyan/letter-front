import Messenger from "@/screens/messages";
import { GetServerSidePropsContext } from "next";

export default Messenger;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        data: {},
      },
    };
  } catch (error) {
    return { props: {} };
  }
};
