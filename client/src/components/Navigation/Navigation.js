import React from "react";
import { withRouter } from 'react-router-dom';
import { Image, Nav, Navbar, NavItem } from "react-bootstrap";

import "./Navigation.scss";
import { logo } from '../../assets/images/logo.svg';

const Navigation = withRouter(({ history }) => {
  const navigateHelper = path => () => {
    history.push(path);
  };

  return (
    <Navbar default collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand onClick={navigateHelper('/')}>
          <Image src={logo} alt="Fresh" className="img-responsive"/>
        </Navbar.Brand>
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav>
          <NavItem onClick={navigateHelper('/dashboard')} title="Dashboard" eventKey={1}>Dashboard</NavItem>
        </Nav>

        <Nav pullRight>
          <NavItem onClick={navigateHelper('/login')}>Login</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
});

export default Navigation;