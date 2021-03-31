import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const SOCKET_SERVER_URL = 'ws://127.0.0.1:4000'

const useChat = username => {
	const [messages, setMessages] = useState({});
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
            auth: {
                userID: username // Replace this with token eventually
            }
		});

		// console.log('socketRef', socketRef.current)

		socketRef.current.on('connect', () => {
			console.log(socketRef.current.id);
			console.log('connected!')
		})

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
        };

	}, [username])

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
	}

	const disconnectFromSocket = () => {
        console.log("Socket: " + socketRef.current.id + " has been disconnected.");
        socketRef.current.disconnect();
    };

	return { messages, sendMessage, disconnectFromSocket } 

}

export default useChat;