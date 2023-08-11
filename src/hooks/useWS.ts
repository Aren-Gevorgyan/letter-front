
import { memo, useEffect } from "react";

const WebSocketClient: any = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000"); // Use your WebSocket server address here

    socket.onopen = () => {
      console.log("Connected to WebSocket server.");
      // Add any logic to handle the WebSocket connection being established
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log("Received message from server:", message);
      // Add any logic to handle the received message from the server
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server.");
      // Add any logic to handle the WebSocket connection being closed
    };

    // Function to send a message to the server
    const sendMessageToServer = (message: string) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        console.log("WebSocket is not open. Cannot send the message.");
      }
    };

    // Example usage of the sendMessageToServer function
    // Uncomment the line below and add your message to send it to the server
    // sendMessageToServer('Hello from client!');

    return () => {
      socket.close(); // Close the WebSocket connection when the component unmounts
    };
  }, []);

  return null;
};

export default WebSocketClient;