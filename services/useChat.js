import React, {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const SOCKET_SERVER_URL = 'http://Gettingstartedapp-env.eba-sm3mz4hp.us-east-2.elasticbeanstalk.com';

const useChat = username => {
	const [messages, setMessages] = useState({});
    let socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
			auth: {
				userID: username // Replace this with token eventually
			}
		});

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, async ({ to, from, content }) => {
			console.log('Message: ', content);
			setMessages(messages => {
				const prevConversation = messages[from] || [];
				return {
					...messages,
					[from]: [...prevConversation, {content: message, fromSelf: false, time: new Date()}]
				};
			});
		});

		return () => {
            socketRef.current.disconnect();
		}
	}, []);

    const sendMessage = (to, content) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            content: content,
            to
        });

        setMessages(messages => {
            const prevConversation = messages[to] || [];
            return {
                ...messages,
                [to]: [...prevConversation, {content, fromSelf: true, time: new Date()}]
            };
        });
    };

    return { messages, sendMessage }
};

export default useChat;