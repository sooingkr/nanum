import React from "react";
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Navbar, Nav, NavItem, NavDropdown, Image, MenuItem } from "react-bootstrap";

import "./Navigation.scss";
// import { logo } from '../../assets/images/logo.png';


const Navigation = withRouter(({ history }) => {
  const navigateHelper = path => () => {
    history.push(path);
  };

  return (
    <header>
      <Navbar default collapseOnSelect>
        <Row>
          <Col md={3}>
            <Navbar.Header>
              <div className="logo-block pull-left">
                  {/*<Link to="/" title="Home"><Image src={logo} alt="Fresh" className="img-responsive"/></Link>*/}
                  <Link to="/" title="신 안전먹거리" className='logo'><Image src="https://images-na.ssl-images-amazon.com/images/G/01/omaha/images/yoda/logos/fresh-modal-3x._CB315803244_.png" alt="Fresh" className="img-responsive"/></Link>
                <Navbar.Toggle />
              </div>
              <Link className="pull-right visible-xs btn-search" to={{pathname:'/search?q=query'}} title="통합검색"><span className="glyphicon glyphicon-search"></span></Link>

            </Navbar.Header>
          </Col>
          <Col md={9}>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem onClick={navigateHelper('/')} title="신 안전먹거리" eventKey={1}>신 안전먹거리</NavItem>
                <NavItem onClick={navigateHelper('/safety/searchProduct.do')} title="구 안전먹거리" eventKey={2}>구 안전먹거리</NavItem>
                <NavItem onClick={navigateHelper('/company/companyMain.do')} title="HACCP관리 전산기준서" eventKey={3}>HACCP관리 전산기준서</NavItem>
                <NavItem onClick={navigateHelper('/board/boardList.do?board=21')} title="민원" eventKey={4}>민원</NavItem>
                <NavItem onClick={navigateHelper('/lod/info.do')} title="데이터활용" eventKey={5}>데이터활용</NavItem>
                <NavItem className="hidden-xs" onClick={navigateHelper('/search?q=query')} title="통합검색" eventKey={6}><span className="glyphicon glyphicon-search"></span></NavItem>
                <NavDropdown eventKey={7} title="" id="basic-nav-dropdown">
                  <MenuItem eventKey={7.1} onClick={navigateHelper('/login')}>Login</MenuItem>
                  <MenuItem eventKey={7.2}>Another action</MenuItem>
                  <MenuItem eventKey={7.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={7.4}>Separated link</MenuItem>
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