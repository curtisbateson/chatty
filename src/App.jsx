import React, {Component} from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// Main App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anon', // optional. if currentUser is not defined, it means the user is Anonymous
      currentUserColor: '#639', // default colour for username
      numUsers: 0,
      messages: []
    }
    this.onPost = this.onPost.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      console.log("Connected to server");

      this.onPost({
        content: 'A new user has joined the Chatty',
        type: "postNotification"
      })
    };

    this.socket.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data);

      // Check message types to handle messages that should not be added to the display
      switch (eventData.type) {
        case 'userNumUpdate': {
          this.setState({
            numUsers: eventData.num
          });
          break;
        }
        case 'userColor': {
          this.setState({
            currentUserColor: eventData.color
          });
          break;
        }
        // Add messages to the display if they aren't used for updating user count or username colours
        default: {
          this.setState({
            messages: this.state.messages.concat(eventData)
          });
        }
      }
    });
  }

  // Function to update username
  onNameChange(name) {
    this.setState({
      currentUser: name
    });
  }

  // Function to send messages to the server
  onPost(message) {
    message.color = this.state.currentUserColor;
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <NavBar numUsers={this.state.numUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar onNameChange={this.onNameChange} onPost={this.onPost} currentUser={this.state.currentUser} color={this.state.currentUserColor} />
      </div>
    );
  }
}
export default App;
