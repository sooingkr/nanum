import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Grid, Row, Col, Image } from 'react-bootstrap';

import FoodDetails from '../../components/FoodInfoInquiry/FoodDetails';
import FoodDetailCarousel from '../../components/FoodInfoInquiry/FoodDetailCarousel';

import { getFoodDetailData, FoodInquiryDuck } from "./FoodDuck";

class FoodInfoInquiry extends Component {

  componentWillMount() {
    const { getFoodDetailData, match } = this.props;
    const foodDetail = getFoodDetailData(match.params.id);
  }

  render() {
    const { foodDetail } = this.props;
    const { diagnosticMessage, alternativeFoods }  = foodDetail;

    return (
      <div className="product">
        <Grid fluid>
          <Row>
            <Col md={12}><div className="product__foodInfo visible-xs">{diagnosticMessage}</div>
            </Col>
            <Col md={7}>
              <Image className="product__image" src={foodDetail.imageUrl} alt={foodDetail.name} responsive></Image>
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
  getFoodDetailData
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodInfoInquiry);