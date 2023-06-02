import React from "react";
import './Header.css'
import { Navbar, Nav,Button ,Row} from "reactstrap";
import { useState } from "react";

const Header = (title) => {

  return (
    <header className="pt-16 pb-16 header-background">
        <div className="header-item">
            <div>
          <h3 className=''>Pico Art </h3>
          </div>
          <div className="logout">
                  <Button variant="light" className="id">
                    User ID: EMP001
                  </Button>
                  <Button variant="light" className="logout">
                    Logout <img className="signout"></img>
                  </Button>
                  </div>
                  </div>
              
    </header>
  );
};

export default Header;