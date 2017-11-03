import React, {Component} from 'react';

// Component describing a user message
class Message extends Component {
  render() {

    // Colour for username
    const style = {
      color: this.props.color
    };

    return (
        <div className="message">
          <span className="message-username" style={style}>{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
    );
  }
}
export default Message;
