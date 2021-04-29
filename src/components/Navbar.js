import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../images/logo.svg';

const params = new URLSearchParams(window.location.search);
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
            <Link to={"/rooms?"+params}>Buy</Link>
          </li>
          <li className="nav-left">
            <Link to="/">Sell</Link>
          </li>
          <li className="nav-right">
            <a href="https://www.foil.group/" target="_blank" rel="nofollow">Journal</a>
          </li>
        </ul>
        <Link className="saleLogo" to="/">
          <img src={logo} alt="House Sale" />
        </Link>
        <button
          type="button"
          className={`nav-btn ${this.state.isOpen ? 'active' : ''}`}
          onClick={this.handleToggle}
        >
          Main menu toggle
        </button>
      </nav>
    );
  }
}
