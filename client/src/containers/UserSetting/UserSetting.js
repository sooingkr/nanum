import React from 'react';
import UserSettingForm from './UserSettingForm';

class UserSetting extends React.Component {
  handleSubmit = () => {

  }

  render() {
    return (
      <div className="user-setting">  
        <div className="user-setting-content">
          <UserSettingForm onSubmit={this.handleSubmit}/>
        </div>
      </div>
    )
  }
}

export default UserSetting;