import React, {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import { saveMessage } from "./storage.service";
import { encryptMessage, decryptMessage } from "./signal.service";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const SOCKET_SERVER_URL = 'http://Gettingstartedapp-env.eba-sm3mz4hp.us-east-2.elasticbeanstalk.com';

const useChat = token => {
	const [messages, setMessages] = useState({});
    let socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
			auth: {
                token: token
			}
		});

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, async ({ to, from, content }) => {
			const decryptedMessage = decryptMessage(content, from);
			setMessages(messages => {
                const prevConversation = messages[from] || [];
                const currentTime = new Date();
				return {
					...messages,
					[from]: [...prevConversation, {content: decryptedMessage, fromSelf: false, time: currentTime}]
				};
            });
            saveMessage(from, {content: decryptedMessage, fromSelf: false, time: currentTime})
		});

		return () => {
            socketRef.current.disconnect();
		}
	}, []);

    const sendMessage = (to, content) => {
        const encryptedMessage = encryptMessage(content, to);

        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            content: encryptedMessage,
            to
        });

        const currentTime = new Date();

        setMessages(messages => {
            const prevConversation = messages[to] || [];
            return {
                ...messages,
                [to]: [...prevConversation, {content, fromSelf: true, time: currentTime}]
            };
        });
        saveMessage(to, {content: decryptMessage, fromSelf: true, time: currentTime})
    };

    return { messages, sendMessage }
};

export default useChat;