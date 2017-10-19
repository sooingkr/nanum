import React from 'react';
import PropTypes from 'prop-types';

const withInfiniteScroll = (conditionFn) => (Component) => {
  return class WithInfiniteScroll extends React.Component {
    static propTypes =  {
      onPaginateLoad: PropTypes.func.isRequired,
    }
    
    componentWillMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      conditionFn(this.props) && this.props.onPaginateLoad();
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export default withInfiniteScroll;