import React, {useEffect, useRef} from "react";
import {io} from "socket.io-client";
import {encryptMessage, decryptMessage} from "./services/signal.service";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const SOCKET_SERVER_URL = 'http://Gettingstartedapp-env.eba-sm3mz4hp.us-east-2.elasticbeanstalk.com';

const useSockets = (token, saveMessage) => {
    let socketRef = useRef();

    useEffect(() => {
        if (!!token) {
            socketRef.current = io(SOCKET_SERVER_URL, {
                auth: {
                    token: token
                }
            });

            socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, async ({to, from, content}) => {
                const decryptedMessage = await decryptMessage(content, from);

                const currentTime = new Date();
                const message = {content: decryptedMessage, fromSelf: false, time: currentTime};

                saveMessage(from, message);
            });
        }
        return () => {
            if (!!socketRef.current) {
                socketRef.current.disconnect();
            }
        }
    }, [token]);

    const sendMessage = async (to, content) => {
        if (!!socketRef.current) {
            const encryptedMessage = await encryptMessage(content, to);

            socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
                content: encryptedMessage,
                to
            });

            const currentTime = new Date();
            const message = {content, fromSelf: true, time: currentTime};
            saveMessage(to, message)
        }
    };

    return {sendMessage}
};

export default useSockets;