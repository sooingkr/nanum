import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

import { 
  Navbar, 
  Nav, 
  NavItem, 
  NavDropdown, 
  Image, 
  MenuItem,
  Collapse,
} from "react-bootstrap";

import FoodSearchBoxContainer from '../../containers/FoodSearch/FoodSearchBoxContainer';

import {HomeDuck} from '../../containers/Home/HomeDuck';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavMenu: false,
    }
  }

  toggleNav = () => {
    this.setState({ showNavMenu: !this.state.showNavMenu });
  };

  handleHaccpButton = () => {
    const { toggleChatBox, history } = this.props;
    const userId = '';

    if (userId) { /* user logged in */
      toggleChatBox();

    } else { /* not logged in */
      history.push('/service');

    }
  };

  render() {
    const { history } = this.props;

    return (
      <header>
        <Navbar default collapseOnSelect>
          <div className="navigation__logo">
            <Link to="/" title="신 안전먹거리" className='logo'>
              <Image className="logo-circle" responsive src="https://fresh.ihaccp.or.kr/images/fresh/common/header_icon01.gif" alt="Fresh"/>
              <Image className="logo-fresh" responsive src="https://fresh.ihaccp.or.kr/images/fresh/common/header_logo02.gif" alt="Fresh"/>
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
                <NavItem onClick={navigateHelper('/', history)} title="추천먹거리정보" eventKey={1}>추천먹거리정보</NavItem>
                <NavItem onClick={this.handleHaccpButton} title="HACCP 기술상담" eventKey={2}>HACCP 기술상담</NavItem>
                <NavItem onClick={navigateHelper('/safety/searchProduct.do', history)} title="안전먹거리정보" eventKey={3}>안전먹거리정보</NavItem>
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

export default withRouter(
  connect(null, {
    toggleChatBox: HomeDuck.actions.toggleChatBox,
  })(Navigation)
);

Navigation.propTypes = {
  toggleNav: PropTypes.func,
  handleHaccpButton: PropTypes.func,
  navigateHelper: PropTypes.func,
  toggleChatBox: PropTypes.func,
  history: PropTypes.object.isRequired,
}

function navigateHelper(path, history) {
  return function() {
    history.push(path);
  }
}