import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { 
  Form, FormGroup, 
} from 'react-bootstrap';
import MultiCheckboxField from '../../components/UserSettings/MultiCheckboxField';
import RadioField from '../../components/UserSettings/RadioField';
import { UserSettingsDuck } from './UserSettingsDuck';

let UserSettingsForm = ({ 
  handleSubmit, 
  pristine, 
  reset, 
  submitting, 
  fieldList: { diseases, interests },
  selectedDiseases,
  selectedInterests,
  allDiseases,
  allInterests,
  isInitial,
}) => {
  const initClass = isInitial ? 'initial' : '';
  return (<Form horizontal onSubmit={handleSubmit} className="user-setting__form">
    <fieldset className="profile-fields">
      <legend>회원 정보</legend>
      <FormGroup>
        <Field 
          name="firstName" 
          className="text-input"
          component="input"
          type="text"
          placeholder="이름"
        />
        <Field 
          name="lastName" 
          className="text-input"
          component="input"
          type="text"
          placeholder="성"
        />
      </FormGroup>
      <FormGroup className="align-left">
        <label>
          <Field 
            name="gender" 
            className="radio-input"
            component={RadioField}
            value="MALE"
            type="radio"
          />
          <span>여성</span>
        </label>
        <label>
          <Field 
            name="gender" 
            className="radio-input"
            component={RadioField}
            value="FEMALE"
            type="radio"
          />
          <span>남성</span>
        </label>
      </FormGroup>
    </fieldset>
    <fieldset className="diseases-fields">
      <legend>질병 유무 확인란</legend>
      <FormGroup>
        <Field 
          name="height" 
          className="text-input"
          component="input"
          type="text"
          placeholder="키"
        />
        <Field 
          name="weight" 
          className="text-input"
          component="input"
          type="text"
          placeholder="몸무게"
        />
      </FormGroup>
      <p>해당하는 질병을 선택해 주세요. (한개 이상 선택 가능)</p>
      <Field name="diseases" component={props => 
        <MultiCheckboxField 
          {...props.input}
          label="Diseases"
          className={initClass}
          options={allDiseases}
          selectedOptions={selectedDiseases}
          field={props.input}
        />
      }
      />
    </fieldset>
    <fieldset className="interests-fields">
      <legend>관심 분야</legend>
      <p>해당하는 관심사를 선택해 주세요. (한개 이상 선택 가능)</p>
      <Field name="interests" component={props => 
        <MultiCheckboxField 
          {...props.input}
          label="Interests"
          className={initClass}
          options={allInterests}
          selectedOptions={selectedInterests}
          field={props.input}
        />
      }
      />
    </fieldset>
    <button type="submit">완료</button>
  </Form>
  )
};

UserSettingsForm = reduxForm({
  form: 'UserSettingsForm',
  fieldList: ['diseases']
})(UserSettingsForm);

// Get initial values from store
const mapStateToProps = (state) => ({
  initialValues: {
    firstName: state[UserSettingsDuck.storeName].firstName,
    lastName: state[UserSettingsDuck.storeName].lastName,
    gender: state[UserSettingsDuck.storeName].gender,
    height: state[UserSettingsDuck.storeName].height,
    weight: state[UserSettingsDuck.storeName].weight,
  },
  selectedDiseases: UserSettingsDuck.selectors.getSelectedDiseases(state),
  selectedInterests: UserSettingsDuck.selectors.getSelectedInterests(state),
  allDiseases: UserSettingsDuck.selectors.getAllDiseases(state),
  allInterests: UserSettingsDuck.selectors.getAllInterests(state),
  isInitial: UserSettingsDuck.selectors.getIsInitial(state),
})

UserSettingsForm = connect(mapStateToProps)(UserSettingsForm);

UserSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserSettingsForm;