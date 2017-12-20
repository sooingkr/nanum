import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import {
  Form, FormGroup,
} from 'react-bootstrap';
import MultiCheckboxField from '../../components/UserSettings/MultiCheckboxField';
import RadioField from '../../components/UserSettings/RadioField';
import { selectors } from './UserSettingsDuck';

const errorMessages = {
  required: '필수정보를 입력하셔야 합니다',
  minBirthYear: '태어난 해는 1900년 이후만 입력할 수 있습니다'
}

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = errorMessages.required
    return errors;
  }
  if (!values.lastName) {
    errors.lastName = errorMessages.required
    return errors;
  }
  if (!values.gender) {
    errors.gender = errorMessages.required
    return errors;
  }

  if (!values.birthYear) {
    errors.birthYear = errorMessages.required
    return errors;
  } else if (values.birthYear < 1900) {
    errors.birthYear = errorMessages.minBirthYear
    return errors;
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  ...rest
}) => {
  const errorClass = error ? 'error' : '';
  return (
    <input
      {...input}
      className={`${errorClass} ${rest.className}`}
      placeholder={rest.placeholder}
      type={type}
    />
  )
}

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
  allAllergies,
  userGender,
}) => {
  return (
    <Form horizontal onSubmit={handleSubmit} className="user-setting__form">
    <fieldset className="profile-fields">
      <legend>회원 정보</legend>
      <FormGroup>
        <Field
          name="firstName"
          className="text-input"
          component={renderField}
          type="text"
          placeholder="이름"
        />
        <Field
          name="lastName"
          className="text-input"
          component={renderField}
          type="text"
          placeholder="성"
        />
        <Field
          name="birthYear"
          className="text-input"
          component={renderField}
          type="number"
          placeholder="생년 (예: 1988)"
          min="1"
          step="1"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="height"
          className="text-input"
          component="input"
          type="number"
          placeholder="키"
        />
        <Field
          name="weight"
          className="text-input"
          component="input"
          type="number"
          placeholder="몸무게"
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
      <p>해당하는 질병을 선택해 주세요. (한개 이상 선택 가능)</p>
      <Field name="diseases" component={props =>
        <MultiCheckboxField
          {...props.input}
          label="Diseases"
          options={allDiseases}
          field={props.input}
          onlyOne={false}
        />
      }
      />
    </fieldset>
    <fieldset className="interests-fields">
      <legend>관심 분야</legend>
      <p>해당하는 관심사를 하나만 선택해 주세요.</p>
      <Field name="interests" component={props =>
        <MultiCheckboxField
          {...props.input}
          label="Interests"
          options={allInterests}
          field={props.input}
          onlyOne
          userGender={userGender}
          exclude={userGender === 'MALE' ? '임산부' : ''}
        />
      }
      />
    </fieldset>

    <fieldset className="allergies-fields">
      <legend>알레르기 유발물질</legend>
      <Field name="allergies" component={props =>
        <MultiCheckboxField
          {...props.input}
          label="Allergies"
          options={allAllergies}
          field={props.input}
          onlyOne={false}
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
  validate,
  onSubmitFail: function (errors) {
    const message = errors[Object.keys(errors)[0]];
    const errorEl = document.querySelector(
      Object.keys(errors).map(fieldName => `[name="${fieldName}"]`).join(',')
    );
    if (errorEl && errorEl.focus) {
      errorEl.focus(); // this scrolls without visible scroll
    }
    window.alert(message);
  }
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
    allergies: selectors.getSelectedAllergies(state),
  },
  allDiseases: selectors.getAllDiseases(state),
  allInterests: selectors.getAllInterests(state),
  allAllergies: selectors.getAllergies(state),
  userGender: formValueSelector('UserSettingsForm')(state, 'gender'),
})

UserSettingsForm = connect(mapStateToProps)(UserSettingsForm);

UserSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserSettingsForm;
