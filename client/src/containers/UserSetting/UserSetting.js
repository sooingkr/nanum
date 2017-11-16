/**
 * Created by navcs on 11/16/17.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ApiKeyContainer from './ApiKeyContainer';

class UserSetting extends Component {

  render() {
    return (
      <div className="user-setting">
        <ApiKeyContainer/>
      </div>
    )
  }

}

export default connect()(UserSetting);