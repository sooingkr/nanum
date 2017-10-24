import React from 'react';
import PropTypes from 'prop-types';
import { 
  Row,
  Col,
} from 'react-bootstrap';
import SearchResultItem from './SearchResultItem';

const SearchResultList = ({ data }) => {
  return (
    <div className="search-result-list">
      { data &&
        data.length > 0 && 
        <Row>
          { data.map( (result) => (
              <Col key={result.id} xs={12} sm={4} md={3}>
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

SearchResultList.propTypes = {
  data: PropTypes.array,
}

export default SearchResultList;