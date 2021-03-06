import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Col, Button } from 'react-bootstrap';
import {convertMgToGam} from '../../utils/AppUtils';

class FoodDetails extends Component {
  render () {
    const { foodDetail } = this.props;
    if (isEmpty(foodDetail)) return null;

    const {
      name,
      message,
      calories,
      carbohydrate,
      protein,
      fat,
      masterId,
      productNo,
      carbohydrateDifferent,
      proteinDifferent,
      fatDifferent,
      manufacturer,
    } = foodDetail;

    return (
      <div className="product__detail">
        <Row>
          <Col lg={7}>
            <h2 className="product__title">
              {name}
              <div className="small__title visible-xs">{manufacturer}</div>
            </h2>
          </Col>
          <Col lg={5} className="product__kcal">
            <strong>{calories}</strong> kcal
            <div className="small__title hidden-xs">{manufacturer}</div>
          </Col>
        </Row>
        <Row>
          { message &&
            <div className="product__foodInfo hidden-xs">{message}</div>
          }
          <div className="product__kcalLevel">
            <div className="product__kcalLevel-item">
              <div className="kcalLevel__diff">
                <span>평균대비</span>
                <span>{convertMgToGam(carbohydrateDifferent)}</span>
              </div>
              <div className="kcalLevel__number">{convertMgToGam(carbohydrate)}</div>
              <div className="kcalLevel__title">탄수화물(g)</div>
            </div>
            <div className="product__kcalLevel-item">
              <div className="kcalLevel__diff">
                <span>평균대비</span>
                <span>{convertMgToGam(proteinDifferent)}</span>
              </div>
              <div className="kcalLevel__number">{convertMgToGam(protein)}</div>
              <div className="kcalLevel__title">단백질(g)</div>
            </div>
            <div className="product__kcalLevel-item">
              <div className="kcalLevel__diff">
                <span>평균대비</span>
                <span>{convertMgToGam(fatDifferent)}</span>
              </div>
              <div className="kcalLevel__number">{convertMgToGam(fat)}</div>
              <div className="kcalLevel__title">지방(g)</div>
            </div>
            <div className="product__kcalLevel-item">
              <Button className="btn-view-haccp" href={`/safety/productDetail.do?productNo=${productNo}&masterId=${masterId}`} title="안전먹거리에서 보기">
                안전먹거리에서 보기
              </Button>
            </div>
          </div>
          <p className="product__description">HACCP 인증된 같은 부류 식품들의 평균치와의 주요 영양소 비교입니다.</p>
        </Row>
      </div>
    )
  }
}

FoodDetails.propsType = {
  foodDetail: PropTypes.object.isRequired
};

export default FoodDetails;
