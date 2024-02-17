
import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
  
  <header>

<a href="#main" className="skip">Skip to content</a>


    <nav role="navigation">
        <ul>
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/about">About</Link></li> 
            <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
</header>
    
  );
}

export default Menu;
