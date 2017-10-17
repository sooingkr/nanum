import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
// import PropTypes from 'prop-types';
import _ from 'lodash';

import '../../stylesheets/components/_FoodImageLink.scss';

class FoodImageLink extends Component {
  render() {
    const { foodData } = this.props;

    return (
      <div className="food-image-link">
        {
          _.isArray(foodData) && foodData.map((food, i) => (
            <Link key={i} to={{path: "/product/" + food.id }}>
              <Image className="food-image-link_img" src={food.src} responsive alt={food.name}/>
              <span className="food-image-link_name">{food.name}</span>
              <span className="glyphicon glyphicon-arrow-right"></span>
            </Link>
          ))
        }
      </div>
    );
  }
}
// FoodImageLink.propTypes = {
//   foodData: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//       ]).isRequired,
//       name: PropTypes.string.isRequired,
//       src: PropTypes.string.isRequired
//     })).isRequired
// }
export default FoodImageLink;
