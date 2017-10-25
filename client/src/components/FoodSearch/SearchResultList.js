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

const SearchResultList = ({ data }) => {
  return (
    <div className="search-result-list">
      { data &&
        data.length > 0 && 
        <Row>
          { data.map( (result, idx) => (
              <Col key={result.id + '-' + idx} xs={12} sm={4} md={3}>
                <SearchResultItem 
                  id={result.id}
                  flavor={result.flavor}
                  type={result.type}
                  company={result.company}
                  imageUrl={result.imageUrl}
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
  props.page !== null && !props.isLoading && props.hasError;

const loaderConditions = props => props.isLoading;

const infiniteScrollConditions = props => 
  (window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 90 / 100)
  && props.data.length  
  && !props.isLoading
  && !props.hasError;

const EnhancedSearchResultList = compose(
  withPagination(paginationConditions),
  withInfiniteScroll(infiniteScrollConditions),
  withLoader(loaderConditions),
)(SearchResultList);

EnhancedSearchResultList.displayName = 'EnhancedSearchResultList';
EnhancedSearchResultList.propTypes = {
  data: PropTypes.array,
  onPaginateLoad: PropTypes.func.isRequired,
}

export default EnhancedSearchResultList;