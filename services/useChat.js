import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const useChat = username => {
	const [messages, setMessages] = useState({});
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
            auth: {
                userID: username // Replace this with token eventually
            }
		});

		socketRef.on(NEW_CHAT_MESSAGE_EVENT, async ({ to, from, content }) => {
			console.log('Message: ', content);
			setMessages(messages => {
				const prevConversation = messages[from] || [];
				return {
					...messages,
					[from]: [...prevConversation, {content: message, fromSelf: false}]
				};
			});
		});

		return () => {
            socketRef.current.disconnect();
        };

	}, [])

	const sendMessage = (to, content) => {
		setMessages(messages => {
            const prevConversation = messages[to] || [];
            return {
                ...messages,
                [to]: [...prevConversation, {content, fromSelf: true}]
            };
        });
	}

	const disconnectFromSocket = () => {
        console.log("Socket: " + socketRef.current.id + " has been disconnected.");
        socketRef.current.disconnect();
    };

	return { messages, sendMessage, disconnectFromSocket } 

}

export default useChat;