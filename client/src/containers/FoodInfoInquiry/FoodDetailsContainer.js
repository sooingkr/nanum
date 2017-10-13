import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Row, Col, Image, ProgressBar } from 'react-bootstrap';
import AlternativeFoodContainer from './AlternativeFoodContainer';

class FoodDetailsContainer extends Component {
  render() {
    // const { foodId, foodDetail: {imgSrc, foodName, foodKcal, foodInfo, carbonKcal, proteinKcal, lipidKcal}, alternativeFoods } = this.props;

    const foodDetail = {
      imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
      foodName: '캔모아딸기아이스크림',
      foodKcal: '1200',
      foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
      carbonKcal: 95,
      proteinKcal: 90,
      lipidKcal: 5
    };

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
            <Col md={12} className="visible-xs"><div className="product__foodInfo">{foodDetail.foodInfo}</div>
            </Col>
            <Col md={7}>
              <Image className="product__image" responsive src={foodDetail.imgSrc} alt={foodDetail.foodName}></Image>
            </Col>
            <Col md={5} className="product__detail">
              <Row>
                <Col xs={9} md={7}><h2 className="product__title">{foodDetail.foodName}</h2></Col>
                <Col md={5} className="product__kcal"><strong>{foodDetail.foodKcal}</strong> kcal</Col>
              </Row>
              <Row>
                <div className="product__foodInfo hidden-xs">{foodDetail.foodInfo}</div>
                <div className="product__kcalLevel">
                  <Row>
                    <Col sm={3} className="product__title--small">탄수화물</Col>
                    <Col sm={9}><ProgressBar now={foodDetail.carbonKcal}></ProgressBar></Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="product__title--small">단백질</Col>
                    <Col sm={9}><ProgressBar now={foodDetail.proteinKcal}></ProgressBar></Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="product__title--small">지방</Col>
                    <Col sm={9}><ProgressBar now={foodDetail.lipidKcal}></ProgressBar></Col>
                  </Row>
                </div>
              </Row>
              <Row>
                <div className="food-carousel">
                  <h4 className="food-carousel__title">대체식품 추천 <span className="arrow-icon"></span></h4>
                  <AlternativeFoodContainer foods={alternativeFoods}/>
                </div>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

FoodDetailsContainer.propsType = {
  foodId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  foodDetail: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
    foodKcal: PropTypes.number.isRequired,
    foodInfo: PropTypes.string.isRequired,
    carbonKcal: PropTypes.number.isRequired,
    proteinKcal:PropTypes.number.isRequired,
    lipidKcal:PropTypes.number.isRequired
  }).isRequired
}
export default FoodDetailsContainer;