import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { 
  Row,
  Col,
} from 'react-bootstrap';
import SearchResultItem from './SearchResultItem';
import withLoader from '../HOCs/withLoader';
import withPagination from '../HOCs/withPagination';
import withInfiniteScroll from '../HOCs/withInfiniteScroll';

const SearchResultList = ({ list }) => {
  return (
    <div className="search-result-list">
      { list &&
        list.length > 0 && 
        <Row>
          { list.map( (item, idx) => (
              <Col key={item.id + '-' + idx} xs={12} sm={4} md={3}>
                <SearchResultItem 
                  foodId={item.foodId}
                  name={item.name}
                  manufacturer={item.manufacturer}
                  imageUrl={item.imageUrl}
                />
              </Col>
            )
          )}
        </Row>
      }
    </div>
  )
}

const paginationConditions = props => 
  props.list.page !== -1 && !props.isLoading && props.hasError;

const loaderConditions = props => props.isLoading;

const infiniteScrollConditions = props => 
  (window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 90 / 100)
  && props.list.length > 0
  && !props.isLoading
  && !props.hasError;

const EnhancedSearchResultList = compose(
  withPagination(paginationConditions),
  withInfiniteScroll(infiniteScrollConditions),
  withLoader(loaderConditions),
)(SearchResultList);

EnhancedSearchResultList.displayName = 'EnhancedSearchResultList';
EnhancedSearchResultList.propTypes = {
  list: PropTypes.array,
  onPaginateLoad: PropTypes.func.isRequired,
}

export default EnhancedSearchResultList;