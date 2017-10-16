import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';


class AlternativeFoodItem extends Component {
  render () {
    const {food: { imgSrc, foodName, foodInfo, foodId }} = this.props;

    return(
      <div className='food-slider__food'>
        <Link to={{pathname: "/product/id/" + foodId}} >
          <Image responsive src={imgSrc} alt={foodName}></Image>
        </Link>
        <div className="food-slider__info">{foodInfo}</div>
      </div>
    )
  }
}

AlternativeFoodItem.propTypes = {
  food: PropTypes.shape({
    foodId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
    foodInfo: PropTypes.string.isRequired
  })
}

export default AlternativeFoodItem;