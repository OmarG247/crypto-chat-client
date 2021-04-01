import React, {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const SOCKET_SERVER_URL = 'http://localhost:4000'

const useChat = username => {
	const [messages, setMessages] = useState({});

	useEffect(() => {
		const socket = io(SOCKET_SERVER_URL, {
			auth: {
				userID: username // Replace this with token eventually
			}
		});
	
		if (!socket.connected) {
			socket.connect()
		}
	
		socket.on("connect", () => {
			console.log(socket.id); // x8WIv7-mJelg7on_ALbx
		});
	
		console.log(socket.connected)
	
		socket.on(NEW_CHAT_MESSAGE_EVENT, async ({ to, from, content }) => {
			console.log('Message: ', content);
			setMessages(messages => {
				const prevConversation = messages[from] || [];
				return {
					...messages,
					[from]: [...prevConversation, {content: message, fromSelf: false, time: new Date()}]
				};
			});
		})

		return () => {
			socket.disconnect();
		}
	}, [])




    // useEffect(() => {
	// 	console.log(socketRef)
    //     socketRef.current = io(SOCKET_SERVER_URL, {
    //         auth: {
    //             userID: username // Replace this with token eventually
    //         }
	// 	});

	// 	socketRef.current.open();

	// 	// console.log('socketRef', socketRef.current)

	// 	socketRef.current.on('connect', () => {
	// 		console.log(socketRef.current.id);
	// 		console.log('connected!')
	// 	})

	// 	socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, async ({ to, from, content }) => {
	// 		console.log('Message: ', content);
	// 		setMessages(messages => {
	// 			const prevConversation = messages[from] || [];
	// 			return {
	// 				...messages,
	// 				[from]: [...prevConversation, {content: message, fromSelf: false, time: new Date()}]
	// 			};
	// 		});
	// 	});

	// 	return () => {
    //         socketRef.current.disconnect();
    //     };

	// }, [])

	const sendMessage = (to, content) => {
		socket.emit(NEW_CHAT_MESSAGE_EVENT, {
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
        console.log("Socket: " + socket.id + " has been disconnected.");
        socket.disconnect();
    };

	return { messages, sendMessage, disconnectFromSocket } 

}

export default useChat;