/**
 * Created by navcs on 11/16/17.
 */

/**
 * Created by navcs on 11/16/17.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ApiKeyList from '../../components/UserSetting/ApiKeyList';

const mockData = [{content: '0209837402'}, {content: '3463462098'}];

export default class ApiKeyContainer extends Component {

  render() {
    return (
      <div className="api-key">
        <h3 className="api-key__title">Open API key 관리 </h3>
        <h4 className="api-key__sub-title">Key 발급</h4>
        <button className="api-key__btn">발급</button>
        <h4 className="api-key__sub-title">발급된 key</h4>
        <ApiKeyList apiKeys={mockData}/>
      </div>
    )
  }

}
