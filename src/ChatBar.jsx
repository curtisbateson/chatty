import React, {Component} from 'react';

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

  onNameChange(event) {
    if(event.key === "Enter") {
      event.preventDefault();
      if(event.target.value !== this.props.currentUser) {
        this.props.onPost({
          content: `${this.props.currentUser} has changed their name to ${event.target.value}`,
          type: "postNotification"
        });
        this.props.onNameChange(event.target.value);
      }
    }
  }

  onInput(event) {
    this.setState({
      content: event.target.value
    });
  }

  onPost(event) {
    if(event.key === "Enter") {
      event.preventDefault();
      this.props.onPost({
        content: this.state.content,
        type: "postMessage",
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
            <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name} onKeyDown={this.onNameChange} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onInput} onKeyDown={this.onPost} />
        </footer>
    );
  }
}
export default ChatBar;
