import React from 'react';
import { connect } from 'react-redux';
import UserSettingsForm from './UserSettingsForm';
import { UserSettingsDuck } from './UserSettingsDuck';

class UserSettings extends React.Component {
  componentDidMount() {
    this.props.initialize()
  }

  handleSubmit = (values) => {
    console.log(values);
    this.props.updateUserSettings(values);
  }

  render() {
    const { selectedDiseases, selectedInterests } = this.props;
    return (
      <div className="user-setting">  
        <div className="user-setting-content">
          <UserSettingsForm 
            onSubmit={this.handleSubmit}
            selectedDiseases={selectedDiseases}
            selectedInterests={selectedInterests}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  initialize: UserSettingsDuck.actions.initialize,
  updateUserSettings: UserSettingsDuck.actions.updateUserSettings,
}

export default connect(null, mapDispatchToProps)(UserSettings);