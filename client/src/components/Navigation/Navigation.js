import React from "react";
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Navbar, Nav, NavItem, NavDropdown, Image, MenuItem} from "react-bootstrap";

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
        <Row>
          <Col sm={4} md={5}>
            <Navbar.Header>
              <div className="logo-block pull-left">
                <Navbar.Brand>
                  <Link to="/" title="Home"><Image src={logo} alt="Fresh" className="img-responsive"/></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </div>
              <div className="hidden-sm-up">
                <SearchBox typeName=" "/>
              </div>
            </Navbar.Header>
          </Col>
          <Col sm={8} md={7}>
            <Navbar.Collapse>
              <Nav>
                <NavItem onClick={navigateHelper('/')} title="" eventKey={1}>Link</NavItem>
                <NavItem onClick={navigateHelper('/dashboard')} title="Dashboard" eventKey={1}>Dashboard</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem className="hidden-xs-down"><SearchBox typeName=" "/></NavItem>
                <NavDropdown eventKey={3} title="" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={navigateHelper('/login')}>Login</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    </header>
  )
});

export default Navigation;