import React from "react";
import './Styles/NavbarStyles.css';
import { Link } from 'react-router-dom';
//This const is a react component to be exported.
//Acts as a hyperlink to navigate between pages.
const Navbar = props => (
  <header className="navbar">
    <nav className="navbar-navigation">
      <div className="navbar-navigation-items">
        <ul>
          <Link to="/Sorting-Visualisation">
            <li>Sorting</li>
          </Link>
          <Link to="/Compare-Runtimes">
            <li>Compare Runtimes</li>
          </Link>
        </ul>
      </div>
    </nav>
  </header>
);
  
export default Navbar;