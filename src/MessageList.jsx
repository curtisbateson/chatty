import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
        switch (message.type) {
        case 'incomingMessage':
        return <Message key={message.id} username={message.username} message={message.content} color={message.color} />;
        break;
        case 'incomingNotification':
        return <Notification key={message.id} message={message.content} />
        break;
        default:
        return <Notification key={message.id} message='Unknown Message Type' />;
        break;
        }
    });

    return (
        <main className='messages'>
            {messages}
        </main>
    );
  }
}
export default MessageList;
