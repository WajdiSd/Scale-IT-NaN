import React from 'react';

import ChatList from '../../components/ChatList';

import profilePic from '../../assets/images/users/avatar-7.jpg';
import profilePic2 from '../../assets/images/users/avatar-4.jpg';


const Chat = () => {
    const chatMessages = [
        { id: 1, userPic: profilePic2, userName: 'Geneva', text: 'Hello!', postedOn: '10:00' },
        {
            id: 2,
            userPic: profilePic,
            userName: 'Shreyu',
            text: 'Hi, How are you? What about our next meeting?',
            postedOn: '10:01',
        },
        { id: 3, userPic: profilePic2, userName: 'Geneva', text: 'Yeah everything is fine', postedOn: '10:02' },
        { id: 4, userPic: profilePic, userName: 'Shreyu', text: "Wow that's great!", postedOn: '10:03' },
        { id: 5, userPic: profilePic, userName: 'Shreyu', text: 'Cool!', postedOn: '10:03' },
    ];

    return (
        <ChatList messages={chatMessages}></ChatList>
    );
};

export default Chat;
