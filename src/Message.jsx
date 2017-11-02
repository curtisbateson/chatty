import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
    );
  }
}
export default Message;

{/* <div class="message system">
          Anonymous1 changed their name to nomnom.
        </div> */}