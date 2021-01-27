import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../images/logo.svg';
export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <nav className="navbar">
        <ul
          className={this.state.isOpen ? 'nav-links show-nav' : 'nav-links'}
        >
          <li className="nav-left">
            <Link to="/">Featured</Link>
          </li>
          <li className="nav-leftmost">
            <Link to="/rooms">Search</Link>
          </li>
          <li className="nav-center"></li>
          <li className="nav-right">
            <Link to="/">Journal</Link>
          </li>
        </ul>
      </nav>
    );
  }
  /* <Link to="/">
      <img className="saleLogo" src={logo} alt="House Sale" />
    </Link>
    <button
      type="button"
      className="nav-btn"
      onClick={this.handleToggle}
    >
      <FaAlignRight className="nav-icon" />
    </button>*/
}
