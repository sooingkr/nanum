import React from "react";
import { withRouter } from 'react-router-dom';
import { Row, Col, Navbar, Nav, NavItem, Image, ButtonToolbar, Dropdown, MenuItem, Glyphicon} from "react-bootstrap";

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
          <Col md={5}>
            <Navbar.Header>
              <Navbar.Brand>
                <a className="pull-left" onClick={navigateHelper('/')} title="Home"><Image src={logo} alt="Fresh" className="img-responsive"/></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Col>
          <Col md={7}>
            <Navbar.Collapse>
              <Nav>
                <NavItem href="/" title="" eventKey={1}>Link</NavItem>
                <NavItem onClick={navigateHelper('/dashboard')} title="Dashboard" eventKey={1}>Dashboard</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem><SearchBox typeName=" "/></NavItem>
                <NavItem>
                  <ButtonToolbar>
                    <Dropdown id="dropdown-user">
                      <Dropdown.Toggle>
                        <Glyphicon glyph="user" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        <MenuItem onClick={navigateHelper('/login')}>Login</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>Active Item</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ButtonToolbar>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    </header>
  )
});

export default Navigation;