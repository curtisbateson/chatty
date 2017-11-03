import React, {Component} from 'react';

// Component describing a chat bar that allows for username and message entry
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.onNameChange = this.onNameChange.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onPost = this.onPost.bind(this);
  }

  // Function to handle username changes
  onNameChange(event) {

    // Name is changed when the field loses focus or if the user presses 'Enter'
    if(event.type === 'blur' || event.key === 'Enter') {
      event.preventDefault();

      // Only update the username if it has been changed
      if(event.target.value !== this.props.currentUser) {
        this.props.onPost({
          content: `${this.props.currentUser} has changed their name to ${event.target.value}`,
          type: "postNotification"
        });
        this.props.onNameChange(event.target.value);
      }
    }
  }

  // Function to update the message text as it is entered
  onInput(event) {
    this.setState({
      content: event.target.value
    });
  }

  // Function to submit a message to the server
  onPost(event) {
    if(event.key === "Enter") {
      event.preventDefault();
      this.props.onPost({
        content: this.state.content,
        type: "postMessage",
        // Set username to 'Anon' if none has been entered so far
        username: this.props.currentUser ? this.props.currentUser : "Anon"
      });
      this.setState({
        content: ''
      });
    }
  }

  render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name} onBlur={this.onNameChange} onKeyDown={this.onNameChange} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onInput} onKeyDown={this.onPost} />
        </footer>
    );
  }
}
export default ChatBar;
