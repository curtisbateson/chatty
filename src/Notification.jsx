import React, {Component} from 'react';

// Component describing a system notification (new user connection, username change, etc)
class Notification extends Component {
  render() {
    return (
      <div className="message system">
        <span className="message-content">{this.props.message}</span>
      </div>
    );
  }
}
export default Notification;
