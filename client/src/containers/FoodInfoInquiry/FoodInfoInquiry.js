import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import FoodDetails from '../../components/FoodInfoInquiry/FoodDetails';
import FoodDetailCarousel from '../../components/FoodInfoInquiry/FoodDetailCarousel';

import { getFoodDetailData, FoodInquiryDuck } from "./FoodDuck";

class FoodInfoInquiry extends Component {
  componentWillMount() {
    const { getFoodDetailData, match } = this.props;
    getFoodDetailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const {match: {params: {id}}} = nextProps;
    const {getFoodDetailData, match} = this.props;

    if (id !== match.params.id) {
      getFoodDetailData(id);
    }
  }

  render() {
    const { foodDetail, hasUserInfo, status } = this.props;
    const { diagnosticMessage, alternativeFoods }  = foodDetail;

    return (
      <div className="product">
        <Grid fluid>
          <Row className="product-content">
            { diagnosticMessage &&
              <Col md={12}>
                <div className="product__foodInfo visible-xs">{diagnosticMessage}</div>
              </Col>
            }
            <div className="product-half">
              <div className="product__image" style={
                {
                  backgroundImage: `url(${foodDetail.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
              </div>
            </div>
            <div className='product-half product-detail__wrapper'>
              <FoodDetails foodDetail={foodDetail}></FoodDetails>
              <div className="food-carousel">
                <h4 className="food-carousel__title">대체식품 추천 <span className="arrow-icon"></span></h4>
                <FoodDetailCarousel 
                  foods={alternativeFoods} 
                  hasUserInfo={hasUserInfo} 
                  status={status}
                />
              </div>
            </div>
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
    hasUserInfo: foodInquiryState.hasUserInfo,
    status: foodInquiryState.status,
  }
};

const mapDispatchToProps = {
  getFoodDetailData
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodInfoInquiry);