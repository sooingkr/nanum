import React, { Component } from 'react';

import { Grid, Row, Col, Image, ProgressBar } from 'react-bootstrap';

import AlternativeFoodContainer from './AlternativeFoodContainer';

import './FoodDetails.scss';

class FoodDetailsContainer extends Component {
  render() {
    const { foodId } = this.props;

    const food = {
      imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
      foodName: '캔모아 딸기 아이스크림',
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
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: "철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'"
      },
      {
        foodId: '2',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: "철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'"
      },
      {
        foodId: '3',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: "철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'"
      },
      {
        foodId: '4',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: "철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'"
      },
      {
        foodId: '5',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: "철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'"
      },
      {
        foodId: '6',
        foodName: '캔모아 딸기 아이스크림',
        imgSrc: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        foodInfo: "철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'"
      }
    ];

    return (
      <div className="product">
        <Grid fluid>
          <Row>
            <Col sm={6} md={7}>
              <Image className="product__image" responsive src={food.imgSrc} alt={food.foodName}></Image>
            </Col>
            <Col sm={6} md={5} className="product__detail">
              <Row>
                <Col md={7}><h2 className="product__title">{food.foodName}</h2></Col>
                <Col md={5} className="product__kcal"><strong>{food.foodKcal}</strong> kcal</Col>
              </Row>
              <Row>
                <div className="product__foodInfo">{food.foodInfo}</div>
                <div className="product__kcalLevel">
                  <Row>
                    <Col sm={3} className="product__title">탄수화물</Col>
                    <Col sm={9}><ProgressBar now={food.carbonKcal}></ProgressBar></Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="product__titile">단백질</Col>
                    <Col sm={9}><ProgressBar now={food.proteinKcal}></ProgressBar></Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="product__title">지방</Col>
                    <Col sm={9}><ProgressBar now={food.lipidKcal}></ProgressBar></Col>
                  </Row>
                </div>
              </Row>
              <Row>
                <div className="food-carousel">
                  <h2 className="food-carousel__title">대체식품 추천</h2>
                  <AlternativeFoodContainer alternativeFoods={alternativeFoods}/>
                </div>
              </Row>
            </Col>
          </Row>
          {/*<Row>*/}
            {/*<Col md={12}>*/}
              {/*<div className="food-carousel">*/}
                {/*<h2 className="food-carousel__title">대체식품 추천</h2>*/}
                {/*<AlternativeFoodContainer alternativeFoods={alternativeFoods}/>*/}
              {/*</div>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        </Grid>
      </div>
    )
  }
}

export default FoodDetailsContainer;