/**
 * Created by navcs on 11/16/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import ApiKeyItem from './ApiKeyItem';

const ApiKeyList = ({apiKeys}) => (
  <div className="api-key__list">
    <ul>
      {
        apiKeys &&
        apiKeys.map((apiKey) => (

          <ApiKeyItem key={apiKey.content} {...apiKey} />
        ))
      }
    </ul>
  </div>
);

export default ApiKeyList;