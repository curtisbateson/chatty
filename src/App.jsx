import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.onPost = this.onPost.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.addEventListener('message', (event) => {
      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      });
    });
  }

  onNameChange(name) {
    this.setState({
      currentUser: name
    });
  }

  onPost(message) {
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar onNameChange={this.onNameChange} onPost={this.onPost} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
