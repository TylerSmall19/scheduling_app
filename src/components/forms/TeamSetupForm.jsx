// This form exists to add a new team
// This will be accessible to all users, and upon creation the "user" will become the "captain" of that team.
import React from 'react';
import { Formik, Form } from 'formik';
import { FormInput } from './FormInput';
import * as Yup from 'yup';
import { SchedulingAPI } from '../../services/schedulingAPIService';
import { navigate } from '@reach/router';
import { appRoutes } from '../../constants/appRoutes';

let initialValues = {
  teamName: '',
  homeLocation: ''
}

const getInitialValues = () => {
  return { ...initialValues };
}

const validationSchema = Yup
  .object()
  .shape({
    teamName: Yup.string()
      .max(60, 'Too long')
      .required('Required'),
    homeLocation: Yup.string()
      .max(100, 'Too long')
      .required('Required')
  })

const Fields = (props) => {
  return (
    <Form>
      <FormInput
        name='teamName'
        label='Team Name'
      />

      <FormInput 
        name='homeLocation'
        label='Home Location'
      />

      <div className='col-sm-4 mt-3'>
        <input className='bs-btn btn-success' type='submit' />
      </div>
    </Form>
  )
}

let _client;

const newSubmissionHandler = async (vals, actions) => {
  _client = _client || new SchedulingAPI();

  return _client.createNewTeam(vals)
    .then(async (res) => {
      await navigate(appRoutes.teamPage(res.id));
      actions.setSubmitting(false);
      return;
    })
    .catch((e) => {
      throw Error('Something went wrong: ' + e);
    })
}

export const TeamSetupForm = (props) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={getInitialValues()}
      render={() => <Fields />}
      onSubmit={newSubmissionHandler}
    />
  );
};