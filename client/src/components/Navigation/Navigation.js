import React from "react";
import { withRouter } from 'react-router-dom';
import {
  Row, Col, Navbar, Nav, NavItem, Image, ButtonToolbar, Dropdown, MenuItem, Glyphicon,
  NavDropdown
} from "react-bootstrap";

import SearchBox from "../../components/SearchBox/SearchBox.js";

import "./Navigation.scss";
import { logo } from '../../assets/images/logo.svg';

const Navigation = withRouter(({ history }) => {
  const navigateHelper = path => () => {
    history.push(path);
  };

  return (
    <header>
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="pull-left" onClick={navigateHelper('/')} title="Home"><Image src={logo} alt="Fresh" className="img-responsive"/></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="/">Link</NavItem>
            <NavItem onClick={navigateHelper('/dashboard')}>Dashboard</NavItem>
          </Nav>

          <Nav pullRight>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <MenuItem onClick={navigateHelper('/dashboard')}>Dashboard</MenuItem>
              <MenuItem onClick={navigateHelper('/login')}>Login</MenuItem>
              <MenuItem >Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem href="/logout">Logout</MenuItem>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </header>
  )
});

export default Navigation;