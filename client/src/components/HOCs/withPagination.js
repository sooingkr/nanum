import React from 'react';

const withPagination = (conditionFn) => (Component) => (props) => (
  <div className="paginated">
    <Component {...props} />
    { conditionFn(props) &&
      <div className="paginated__loadmore">
        <div className="paginated__error">
          Something went wrong...
        </div>
        <button
          type="button"
          className="paginated__button"
          onClick={props.onPaginateLoad}
        >
          Try Again
        </button>
      </div>
    }
  </div>
)

export default withPagination;