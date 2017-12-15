import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import SearchResultItem from './SearchResultItem';
import withLoader from '../HOCs/withLoader';
import withPagination from '../HOCs/withPagination';
import withInfiniteScroll from '../HOCs/withInfiniteScroll';

const renderSearchResultList = (list) => {
  if (list && list.length > 0) {
    return list.map( (item, idx) => (
        <div key={item.id + idx} className="list-grid__item">
          <SearchResultItem 
            id={item.id}
            name={item.name}
            manufacturer={item.manufacturer}
            imageUrl={item.imageUrl}
          />
        </div>
        )
      )
  } else {
    return <span className="list-grid__text">검색결과가 없습니다.</span>;
  }
}

const SearchResultList = ({ list }) => {
  return (
    <div className="search-result-list">
      <div className="list-grid">
        {renderSearchResultList(list)}
      </div>
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