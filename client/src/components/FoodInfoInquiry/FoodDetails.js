import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Button } from 'react-bootstrap';

class FoodDetails extends Component {
  render () {
    const { foodDetail } = this.props;
    if (isEmpty(foodDetail)) return null;

    const {
      name, 
      diagnosticMessage, 
      calories, 
      carbohydrates, 
      proteins, 
      fat 
    } = foodDetail;

    return (
      <div className="product__detail">
        <Row>
          <Col lg={7}>
            <h2 className="product__title">
              {name}
              <div className="small__title visible-xs">캔모아</div>
            </h2>
          </Col>
          <Col lg={5} className="product__kcal">
            <strong>{calories}</strong> kcal
            <div className="small__title hidden-xs">캔모아</div>
          </Col>
        </Row>
        <Row>
          { diagnosticMessage &&
            <div className="product__foodInfo hidden-xs">{diagnosticMessage}</div>
          }
          <div className="product__kcalLevel">
            <div className="product__kcalLevel-item">
              <div className="kcalLevel__number">{carbohydrates}</div>
              <div className="kcalLevel__title">탄수화물(g)</div>
            </div>
            <div className="product__kcalLevel-item">
              <div className="kcalLevel__number">{proteins}</div>
              <div className="kcalLevel__title">단백질(g)</div>
            </div>            
            <div className="product__kcalLevel-item">
              <div className="kcalLevel__number">{fat}</div>
              <div className="kcalLevel__title">지방(g)</div>
            </div>            
            <div className="product__kcalLevel-item">
              <Button className="btn-view-haccp" href="http://fresh.ihaccp.or.kr/safety/productDetail.do?productNo=2013021004600255&masterId=24360" title="안전먹거리에서 보기">안전먹거리에서 보기</Button>
            </div>            
          </div>
        </Row>
      </div>
    )
  }
}

FoodDetails.propsType = {
  foodDetail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nutrientInfo: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired
  }).isRequired
};

export default FoodDetails;