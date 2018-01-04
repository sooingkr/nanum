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
        isWindowBottom: false,
        scrollDir: '',
        lastScrollPos: window.pageYOffset || document.body.scrollTop,
      }
      this.handleScroll = this.handleScroll.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }
  
    componentWillMount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }
    
    handleScroll() {
      if (window.location.href.indexOf('search?foodKeyword') === -1) return;
      conditionFn(this.props) && throttle(this.props.onPaginateLoad, 16)();
    }
  
    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export default withInfiniteScroll;