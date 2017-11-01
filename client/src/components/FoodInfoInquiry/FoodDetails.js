import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, ProgressBar } from 'react-bootstrap';

const FoodDetails = ({foodDetail}) => {

  const { foodName, foodKcal, foodInfo, carbonKcal, proteinKcal, lipidKcal } = foodDetail;


  return (
    <div className="product__detail">
      <Row>
        <Col xs={9} md={7}><h2 className="product__title">{foodName}</h2></Col>
        <Col md={5} className="product__kcal"><strong>{foodKcal}</strong> kcal</Col>
      </Row>
      <Row>
        <div className="product__foodInfo hidden-xs">{foodInfo}</div>
        <div className="product__kcalLevel">
          <Row>
            <Col sm={3} className="product__title--small">탄수화물</Col>
            <Col sm={9}><ProgressBar now={carbonKcal}></ProgressBar></Col>
          </Row>
          <Row>
            <Col sm={3} className="product__title--small">단백질</Col>
            <Col sm={9}><ProgressBar now={proteinKcal}></ProgressBar></Col>
          </Row>
          <Row>
            <Col sm={3} className="product__title--small">지방</Col>
            <Col sm={9}><ProgressBar now={lipidKcal}></ProgressBar></Col>
          </Row>
        </div>
      </Row>
    </div>
  )
}

FoodDetails.propsType = {
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
    proteinKcal: PropTypes.number.isRequired,
    lipidKcal: PropTypes.number.isRequired
  }).isRequired
}

export default FoodDetails;