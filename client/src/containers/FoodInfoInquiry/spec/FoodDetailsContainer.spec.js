import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FoodDetailsContainer from '../FoodDetailsContainer';
import AlternativeFoodContainer from '../AlternativeFoodContainer';

describe('FoodDetailContainer component', () => {
  const wrapper = shallow(<FoodDetailsContainer/>);

  it('should render <FoodDetailContainer /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render div className="product"', () => {
    expect(wrapper.find(".product").length).toBe(1);
  });

  it('should render div className="product__foodInfo"', () => {
    expect(wrapper.find(".product__foodInfo").length).toBeGreaterThanOrEqual(1);
  });

  it('should render Image className="product__image"', () => {
    expect(wrapper.find(".product__image").length).toBe(1);
  });

  it('should render foodDetail props"', () => {
    expect(wrapper.prop('foodDetail').isEmpty()).toBe(false);
  });

  describe('product__detail div', () => {

    const productDetail = wrapper.find(".product__detail");

    it('should render div className="product__detail"', () => {
      expect(productDetail.length).toBe(1);
    });

    it('should render children div className="product__title"', () => {
      expect(productDetail.children().find('.product__title').length).toBe(1);
    });

    it('should render children div className="product__kcal"', () => {
      expect(productDetail.children().find('.product__kcal').length).toBe(1);
    });

    it('should render children div className="product__foodInfo"', () => {
      expect(productDetail.children().find('.product__foodInfo').length).toBe(1);
    });

    const productKcal = productDetail.children().find('.product__kcalLevel');

    describe('product__kcalLevel div', () => {

      it('should render div"', () => {
        expect(productKcal.length).toBe(1);
      });

      it('should render 3 div className="product__title--small"', () => {
        expect(productKcal.children().find(".product__title--small").length).toBe(3);
      });
    });
  });

  const foodCarousel = wrapper.find(".food-carousel");

  describe('food-carousel div', () => {

    it('should render div className="food-carousel"', () => {
      expect(foodCarousel.length).toBe(1);
    });

    it('should render div className="food-carousel__title"', () => {
      expect(foodCarousel.children().find(".food-carousel__title").length).toBe(1);
    });

    describe('AlternativeFoodContainer component with props', () => {

      it('should render <AlternativeFoodContainer foods/> ', () => {
        expect(foodCarousel.find(AlternativeFoodContainer).prop('foods').length).toBeGreaterThanOrEqual(1);
      });
    });
  });
});