import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import Navigation from "../Common/Navigation";

describe('<Navigation /> component', () => {

  const wrapper = shallow(<Navigation/>);

  const handleClick = sinon.spy();

  it('should render <Navigation /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render <header> ', () => {
    expect(wrapper.find('header').length).toBe(1);
  });

  describe('<nav>', () => {
    it('should render <nav> tag ', () => {
      expect(wrapper.children().find('nav').length).toBe(1);
    });

    const navContainer = wrapper.find('nav').children();

    describe('div class="navigation__logo" ', () => {
      it('should render div class="navigation__logo" ', () => {
        expect(navContainer.find('.navigation__logo').length).toBe(1);
      });

      it('should render div class="logo" ', () => {
        expect(navContainer.find('.logo').length).toBe(1);
      });

      it('should render 2 images in div class="logo" ', () => {
        expect(navContainer.find('img').length).toBe(2);
      });

      const toggleButton = navContainer.find('.navigation__toggle');

      it('should render a toggle nav button mobile', () => {
        expect(toggleButton.length).toBe(1);
      });

      it('click to toggle menu on mobile', () => {
        toggleButton.simulate('click');
        expect(handleClick.calledOnce).toEqual(true);
      });
    });

    describe('div class="navigation__main" ', () => {
      it('should render div class="navigation__main"', () => {
        expect(navContainer.find('.navigation__main').length).toBe(1);
      });

      it('should render class="collapse"', () => {
        expect(navContainer.find('.collapse').length).toBe(1);
      });

      it('should render <ul class="collapse nav navbar-nav navbar-right"></ul> list', () => {
        navContainer.find('.collapse > li').forEach((node, index) => {
          expect(node.find('<li>').length).toBeGreaterThanOrEqual(1);
        });
      });
    });

    describe('div class="navigation__secondary" ', () => {
      it('should render div class="navigation__secondary"', () => {
        expect(navContainer.find('.navigation__secondary').length).toBe(1);
      });

      it('should render <ul class="nav"></ul>', () => {
        expect(navContainer.find('.nav').length).toBe(1);
      });

      describe('div class="food-search__box" ', () => {

        it('should render <div class="food-search__box"></div>', () => {
          expect(navContainer.find('.food-search__box').length).toBe(1);
        });

        const foodSearchBox = navContainer.find('.food-search__box');

        it('should render <div class="search-form search-form--light"></div>', () => {
          expect(foodSearchBox.children().find('.search-form').length).toBe(1);
        });

        it('should render <form> element', () => {
          expect(foodSearchBox.children().find('form').length).toBe(1);
        });

        it('should render <input> element', () => {
          expect(foodSearchBox.children().find('input[type="text"]').length).toBe(1);
        });

        it('should render <button> element', () => {
          expect(foodSearchBox.children().find('button').length).toBeGreaterThanOrEqual(1);
        });
      });

      describe('div class="dropdown" ', () => {
        it('should render div class="dropdown"', () => {
          expect(navContainer.children().find('.dropdown').length).toBe(1);
        });

        it('should render a id="secondary-nav-dropdown"', () => {
          expect(navContainer.children().find('#secondary-nav-dropdown').length).toBe(1);
        });

        it('should render <ul class="dropdown-menu"></ul> list', () => {
          navContainer.find('.dropdown-menu > li').forEach((node, index) => {
            expect(node.find('<li>').length).toBeGreaterThanOrEqual(1);
          });
        });
      });
    });
  });
});