import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const withInfiniteScroll = (conditionFn) => (Component) => {
  return class WithInfiniteScroll extends React.Component {
    static propTypes =  {
      onPaginateLoad: PropTypes.func.isRequired,
    }
    
    constructor(props) {
      super(props);
      this.state = { 
        scrollDir: '',
        lastScrollPos: window.pageYOffset || document.body.scrollTop,
      };
    }

    componentWillMount() {
      window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll, false);
    }

    handleScroll = () => {
      conditionFn(this.props) && throttle(this.props.onPaginateLoad, 16)();
    }

    isScrollDown = () => {
      const st = window.pageYOffset || document.body.scrollTop;
      if (st > this.state.lastScrollPos) {
        return true;
      } else {
        return false;
      }
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export default withInfiniteScroll;