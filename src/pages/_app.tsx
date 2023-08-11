import { WebSocketProvider, socket } from "@/common/webSocket";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WebSocketProvider value={socket}>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
};

export default App;
