/**
 * Created by navcs on 11/16/17.
 */

/**
 * Created by navcs on 11/16/17.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export default class ApiKeyContainer extends Component {

  render() {
    return (
      <div>
        <h3>Open API key 관리 </h3>
        <h4>Key 발급</h4>
        <button>발급</button>
        <h4>발급된 key</h4>
        <ul>
          <li></li>
        </ul>
      </div>
    )
  }

}
