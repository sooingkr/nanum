import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  NavItem, 
  NavDropdown, 
  Image, 
  MenuItem,
  Collapse,
} from "react-bootstrap";
import FoodSearchBoxContainer from '../containers/FoodSearch/FoodSearchBoxContainer';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavMenu: false,
    }
  }

  toggleNav = () => {
    this.setState({ showNavMenu: !this.state.showNavMenu });
  }

  render() {
    const { history } = this.props;

    return (
      <header>
        <Navbar default collapseOnSelect>
          <div className="navigation__logo">
            <Link to="/" title="신 안전먹거리" className='logo'>
              <Image 
                src="https://images-na.ssl-images-amazon.com/images/G/01/omaha/images/yoda/logos/fresh-modal-3x._CB315803244_.png" 
                alt="Fresh" 
                className="img-responsive"
              />
            </Link>
            <button className="navigation__toggle" 
                    type="button"
                    onClick={this.toggleNav}>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </button>
          </div>

          <div className="navigation__main">
            <Collapse in={this.state.showNavMenu}>
              <Nav pullRight>
                <NavItem onClick={navigateHelper('/', history)} title="신 안전먹거리" eventKey={1}>신 안전먹거리</NavItem>
                <NavItem onClick={navigateHelper('/safety/searchProduct.do', history)} title="구 안전먹거리" eventKey={2}>구 안전먹거리</NavItem>
                <NavItem onClick={navigateHelper('/company/companyMain.do', history)} title="HACCP관리 전산기준서" eventKey={3}>HACCP관리 전산기준서</NavItem>
                <NavItem onClick={navigateHelper('/board/boardList.do?board=21', history)} title="민원" eventKey={4}>민원</NavItem>
                <NavItem onClick={navigateHelper('/lod/info.do', history)} title="데이터활용" eventKey={5}>데이터활용</NavItem>
                <NavItem onClick={navigateHelper('/product/2', history)} title="데이터활용" eventKey={6}>데이터활용</NavItem>
              </Nav>
            </Collapse>
          </div> 

          <div className="navigation__secondary">
            <Nav>
              <FoodSearchBoxContainer />
              <NavDropdown eventKey={7} title="" id="secondary-nav-dropdown">
                <MenuItem eventKey={7.1} onClick={navigateHelper('/login', history)}>Login</MenuItem>
                <MenuItem eventKey={7.2} onClick={navigateHelper('/dashboard', history)}>Dashboard</MenuItem>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar>
      </header>
    );
  }
} 

export default withRouter(Navigation);

function navigateHelper(path, history) {
  return function() {
    history.push(path);
  }
}