import React from "react";
import "./Header.css";
import { Navbar, Nav, Button, Row } from "reactstrap";
import { useState } from "react";
import pico from "./assets/Pico.png";

const Header = (title) => {
  return (
    <header className=" border-bottom">
      <div className="header-item">
        <img src={pico} alt="logo" className="pico-logo" />
      </div>
    </header>
  );
};

export default Header;
