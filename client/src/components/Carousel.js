import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class Carousel extends Component {
  render() {
    const { className } = this.props;
    const settings = this.props.settings;
    return (
      <Slider className={className} {...settings}>
        { this.props.children }
      </Slider>
    )
  }
}

Carousel.defaultProps = {
  settings: {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
}

Carousel.propTypes = {
  className: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired
}

export default Carousel;