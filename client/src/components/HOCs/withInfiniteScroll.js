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
    
    handleScroll() {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.setState({
          isWindowBottom: true
        });
      } else {
        this.setState({
          isWindowBottom: false
        });
      }
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