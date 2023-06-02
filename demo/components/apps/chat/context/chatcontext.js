import React, { useState } from 'react';
import getConfig from 'next/config';

export const ChatContext = React.createContext();

export const ChatProvider = (props) => {
    const [users, setUsers] = useState([]);
    const _activeUser = {
        id: 1,
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
        status: 'active',
        messages: [
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                ownerId: 1,
                createdAt: 1652646338240
            },
            {
                text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                ownerId: 1,
                createdAt: 1652646368718
            },
            {
                text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                ownerId: 123,
                createdAt: 1652646368718
            }
        ],
        lastSeen: '2d'
    };
    const [activeUser, setActiveUser] = useState({
        id: 1,
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
        status: 'active',
        messages: [
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                ownerId: 1,
                createdAt: 1652646338240
            },
            {
                text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                ownerId: 1,
                createdAt: 1652646368718
            },
            {
                text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                ownerId: 123,
                createdAt: 1652646368718
            }
        ],
        lastSeen: '2d'
    });
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const getChatData = () => {
        return fetch(contextPath + '/demo/data/chat.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    };

    const changeActiveChat = (user) => {
        setActiveUser(user);
    };

    const sendMessage = (message) => {
        const newUsers = users.filter((user) => {
            if (user.id === activeUser.id) {
                user.messages.push(message);
            }
        });
        setActiveUser((prevState) => ({ ...prevState, messages: [...prevState.messages, message] }));
        setUsers((prevState) => [...prevState, newUsers]);
    };

    const value = {
        users,
        setUsers,
        activeUser,
        setActiveUser,
        getChatData,
        changeActiveChat,
        sendMessage
    };

    return <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>;
};
