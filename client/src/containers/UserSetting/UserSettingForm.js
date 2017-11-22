import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { 
  Form, FormGroup, 
} from 'react-bootstrap';
import MultiCheckboxField from '../../components/UserSetting/MultiCheckboxField';
import RadioField from '../../components/UserSetting/RadioField';

const mockOptions = [
  {
    id: '123',
    label: '당뇨'
  },
  {
    id: '1234',
    label: '아토피'
  },{
    id: '12345',
    label: '골다공증'
  },{
    id: '123456',
    label: '빈혈'
  },{
    id: '12367',
    label: '여드름'
  },
]

const UserSettingFormView = ({ handleSubmit, pristine, reset, submitting, fieldList: {diseases} }) => (
  <Form horizontal onSubmit={handleSubmit} className="user-setting__form">
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
            name="sex" 
            className="radio-input"
            component={RadioField}
            value="MALE"
            type="radio"
          />
          <span>여성</span>
        </label>
        <label>
          <Field 
            name="sex" 
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
          label="Diseases"
          options={mockOptions}
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
          label="Interests"
          options={mockOptions}
          field={props.input}
        />
      }
      />
    </fieldset>
    <button type="submit">완료</button>
  </Form>
);

const validate = values => {
  const errors = {};
  const { food } = values;

  if (!food) {
    errors.food = 'Please type a food name';
  }

  return errors;
};

const UserSettingForm = reduxForm({
  form: 'UserSettingForm',
  fieldList: ['diseases']
})(UserSettingFormView);

UserSettingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserSettingForm;