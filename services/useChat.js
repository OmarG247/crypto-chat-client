import React, {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import { Auth } from "aws-amplify";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const SOCKET_SERVER_URL = 'http://Gettingstartedapp-env.eba-sm3mz4hp.us-east-2.elasticbeanstalk.com';

const useChat = username => {
	const [messages, setMessages] = useState({});
    let socketRef = useRef();
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    console.log("token", token);

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
			auth: {
				userID: token // Replace this with token eventually
			}
		});

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, async ({ to, from, content }) => {
			console.log('Message: ', content);
			setMessages(messages => {
				const prevConversation = messages[from] || [];
				return {
					...messages,
					[from]: [...prevConversation, {content, fromSelf: false, time: new Date()}]
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