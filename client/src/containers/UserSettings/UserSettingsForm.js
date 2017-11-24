import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { 
  Form, FormGroup, 
} from 'react-bootstrap';
import MultiCheckboxField from '../../components/UserSettings/MultiCheckboxField';
import RadioField from '../../components/UserSettings/RadioField';
import { selectors } from './UserSettingsDuck';

// Form validators
const validateNumber = value => 
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const validateInteger = value => 
  !(!isNaN(value) && 
  parseInt(Number(value), 10) == value && 
  !isNaN(parseInt(value, 10))) ? 'Must be an integer' : undefined;

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
}) => {
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
        <Field 
          name="birthYear" 
          className="text-input"
          component="input"
          type="number"
          validate={validateInteger}
          placeholder="생년 (예: 1988)"
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
          <span>남성</span>
        </label>
        <label>
          <Field 
            name="gender" 
            className="radio-input"
            component={RadioField}
            value="FEMALE"
            type="radio"
          />
          <span>여성</span>
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
          validate={validateNumber}
          placeholder="키"
        />
        <Field 
          name="weight" 
          className="text-input"
          component="input"
          type="text"
          validate={validateNumber}
          placeholder="몸무게"
        />
      </FormGroup>
      <p>해당하는 질병을 선택해 주세요. (한개 이상 선택 가능)</p>
      <Field name="diseases" component={props => 
        <MultiCheckboxField 
          {...props.input}
          label="Diseases"
          options={allDiseases}
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
          options={allInterests}
          field={props.input}
        />
      }
      />
    </fieldset>
    <button type="submit" disabled={submitting}>완료</button>
  </Form>
  )
};

UserSettingsForm = reduxForm({
  form: 'UserSettingsForm',
  fieldList: ['diseases', 'interests'],
  enableReinitialize: true,
})(UserSettingsForm);

// Get initial values from store
const mapStateToProps = (state) => ({
  initialValues: {
    firstName: selectors.getFirstName(state),
    lastName: selectors.getLastName(state),
    birthYear: selectors.getBirthYear(state),
    gender: selectors.getGender(state),
    height: selectors.getHeight(state),
    weight: selectors.getWeight(state),
    diseases: selectors.getSelectedDiseases(state),
    interests: selectors.getSelectedInterests(state),
  },
  allDiseases: selectors.getAllDiseases(state),
  allInterests: selectors.getAllInterests(state),
})

UserSettingsForm = connect(mapStateToProps)(UserSettingsForm);

UserSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserSettingsForm;