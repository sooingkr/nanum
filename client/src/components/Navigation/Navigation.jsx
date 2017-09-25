import React from "react";
import { Navbar, Nav, NavItem, Image } from "react-bootstrap";

import "./Navigation.scss";
import { logo } from '../../assets/images/logo.svg';

export const Navigation = () => {
  return (
    <header>
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" title="Home"><Image src={logo} alt="Fresh" className="img-responsive"/></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem href="/dashboard" title="Dashboard" eventKey={1}>Dashboard</NavItem>
            <NavItem href="/" title="Link" eventKey={2}>Link</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
