import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import {
  Navbar,
  Nav,
  NavDropdown,
  Image,
} from "react-bootstrap";

import Navigation from "../Common/Navigation";
import FoodSearchBoxContainer from '../../containers/FoodSearch/FoodSearchBoxContainer';

describe('<Navigation /> component', () => {

  const wrapper = shallow(<Navigation/>);

  const handleClick = sinon.spy();

  it('should render <Navigation /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render <header> ', () => {
    expect(wrapper.find('header').length).toBe(1);
  });

  describe('<Navigation /> wrapper', () => {

    const navWrapper = wrapper.children().find(Navbar);
    it('should render <nav> tag ', () => {
      expect(navWrapper.length).toBe(1);
    });

    describe('div class="navigation__logo" wrapper', () => {

      it('should render div class="navigation__logo"', () => {
        expect(navWrapper.children().find('.navigation__logo').length).toBe(1);
      });

      const logoWrapper = navWrapper.children().find('.logo');

      it('should render div class="logo"', () => {
        expect(logoWrapper.length).toBe(1);
      });

      it('should render 2 logo images', () => {
        expect(logoWrapper.children().find(Image).length).toBe(2);
      });

      it('should render div class="navigation__toggle"', () => {
        expect(navWrapper.children().find(".navigation__toggle").length).toBe(1);
      });

    });

    describe('div class="navigation__main" wrapper', () => {

      const navMain = navWrapper.children().find('.navigation__main');
      it('should render div class="navigation__main"', () => {
        expect(navMain.length).toBe(1);
      });

      const navLink = navMain.children().find(Nav);

      it('should render list <ul class="nav"></ul>', () => {
        expect(navLink.length).toBe(1);
      });

      it('should render a list navlink"', () => {
        navLink.find('li').forEach((node) => {
          expect(node.length).toBeGreaterThanOrEqual(6);
        });
      });
    });

    describe('div class="navigation__secondary" wrapper', () => {

      const navSecond = navWrapper.children().find('.navigation__secondary');

      it('should render div class="navigation__secondary"', () => {
        expect(navSecond.length).toBe(1);
      });

      describe('<FoodSearchBoxContainer> component', () => {

        it('should render <FoodSearchBoxContainer>', () => {
          expect(navSecond.find(FoodSearchBoxContainer).length).toBe(1);
        });

        const navDropDown = navSecond.find(NavDropdown);

        it('should render NavDropdown', () => {
          expect(navDropDown.length).toBe(1);
        });

        it('should render a group user menu"', () => {
          navDropDown.find('li').forEach((node) => {
            expect(node.length).toBeGreaterThanOrEqual(2);
          });
        });
      });
    });
  });
});