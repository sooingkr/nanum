import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { 
  Form, FormGroup, 
} from 'react-bootstrap';
import MultiCheckboxField from '../../components/UserSetting/MultiCheckboxField';

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

const UserSettingFormView = ({ handleSubmit, pristine, reset, submitting, fields: {diseases} }) => (
  <Form horizontal onSubmit={handleSubmit} className="user-setting__form">
    <fieldset>
      <legend>회원 정보</legend>
      <FormGroup>
        <Field 
          name="firstName" 
          component="input"
          type="text"
          placeholder="이름"
        />
        <Field 
          name="lastName" 
          component="input"
          type="text"
          placeholder="성"
        />
      </FormGroup>
      <FormGroup>
        <Field 
          name="sex" 
          component="input"
          type="radio"
          value="MALE"
          placeholder="여성"
        />
        <Field 
          name="sex" 
          component="input"
          type="radio"
          value="FEMALE"
          placeholder="남성"
        />
      </FormGroup>
    </fieldset>
    <fieldset>
      <legend>질병 유무 확인란</legend>
      <FormGroup>
        <Field 
          name="height" 
          component="input"
          type="text"
          placeholder="키"
        />
        <Field 
          name="weight" 
          component="input"
          type="text"
          placeholder="몸무게"
        />
      </FormGroup>
      <Field name="diseases" component={props => 
        <MultiCheckboxField 
          label="Diseases"
          options={mockOptions}
          field={props.input}
        />
      }
      />
    </fieldset>
    <fieldset>
      <legend>관심 분야</legend>
      <Field name="diseases" component={props => 
        <MultiCheckboxField 
          label="Diseases"
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
  fields: ['diseases']
})(UserSettingFormView);

UserSettingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserSettingForm;