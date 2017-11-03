import React, {Component} from 'react';

// Component describing a navigation bar that displays the current number of users that are connected
class NavBar extends Component {
  render() {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <p>{this.props.numUsers} users online</p>
        </nav>
    );
  }
}
export default NavBar;
