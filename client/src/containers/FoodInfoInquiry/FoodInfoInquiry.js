import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Grid, Row, Col, Image } from 'react-bootstrap';

import FoodDetails from '../../components/FoodInfoInquiry/FoodDetails';
import FoodDetailCarousel from '../../components/FoodInfoInquiry/FoodDetailCarousel';

import { getFoodDetailById, FoodInquiryDuck } from "./FoodDuck";

class FoodInfoInquiry extends Component {

  componentWillMount() {

    const { getFoodDetailById, match } = this.props;
    getFoodDetailById(match.params.id);

  }

  render() {
    const { foodDetail } = this.props;

    const alternativeFoods = [
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

    return (
      <div className="product">
        <Grid fluid>
          <Row>
            <Col md={7}>
              <Image className="product__image" src={foodDetail.imgSrc} alt={foodDetail.foodName} responsive></Image>
            </Col>
            <Col md={5} className='product-detail__wrapper'>
              <FoodDetails foodDetail={foodDetail}></FoodDetails>

              <div className="food-carousel">
                <h4 className="food-carousel__title">대체식품 추천 <span className="arrow-icon"></span></h4>
                <FoodDetailCarousel foods={alternativeFoods}/>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const foodInquiryState = state[FoodInquiryDuck.storeName];

  return {
    foodDetail: foodInquiryState.foodDetail,
  }
};

const mapDispatchToProps = {
  getFoodDetailById,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodInfoInquiry);