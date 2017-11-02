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
    this.props.onNameChange(event.target.value);
  }

  onInput(event) {
    this.setState({
      content: event.target.value
    });
  }

  onPost(event) {
    event.preventDefault();
    this.props.onPost({
      content: this.state.content,
      username: this.props.currentUser
    });
    this.setState({
      content: ''
    });
  }

  render() {
    return (
        <form className="chatbar" onSubmit={this.onPost}>
            <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name} onChange={this.onNameChange} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onInput} />
            <input type="submit" />
        </form>
    );
  }
}
export default ChatBar;
