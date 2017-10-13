import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Carousel from '../Carousel';
import AlternativeFoodItem from './AlternativeFoodItem';

class AlternativeFoodCarousel extends Component {
  render() {
    // const { foods } = this.props;
    const foods = [
      {
        foodId: '1',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'http://data.whicdn.com/images/25342540/original.jpg',
        foodInfo: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        foodId: '2',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://halachaaday.files.wordpress.com/2014/12/546566_food_dessert_yummy_sweet_cheris_chocolate_plate_2500x1923_www-gdefon-ru.jpg',
        foodInfo: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        foodId: '3',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        foodId: '4',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        foodId: '5',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        foodId: '6',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      }
    ];

    const foodCarouselSettings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 }},
        { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 }}]
    };

    return (
      <Carousel className='food-carousel__sliders' settings={foodCarouselSettings}>
        {
          foods.map((food, index) =>
            <div className="food-carousel__item" key={ index }>
              <AlternativeFoodItem food={food}/>
            </div>
          )
        }
      </Carousel>
    );
  }
}

AlternativeFoodCarousel.propTypes = {
  foods: PropTypes.array.isRequired
}

export default AlternativeFoodCarousel;