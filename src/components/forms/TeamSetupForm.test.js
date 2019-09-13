import React from 'react';
import { mount, shallow } from "enzyme";
import { TeamSetupForm } from "./TeamSetupForm";
import { Formik } from 'formik';
import { FormInput } from './FormInput';
import * as Router from '@reach/router';
import { SchedulingAPI } from '../../services/schedulingAPIService';
import { appRoutes } from '../../constants/appRoutes';

// Mock imports if needed
jest.mock('../../services/schedulingAPIService');

describe('TeamSetupForm', () => {
  let componentToTest;

  beforeEach(() => { 
    componentToTest = mount(<TeamSetupForm />);
  });

  describe('No props given', () => { 
    it('Has a form', () => {
      expect(componentToTest.find('form')).toHaveLength(1);
    });

    it('Has at least one input', () => { 
      expect(componentToTest.find('input').length).toBeGreaterThanOrEqual(1);
    });

    describe('Formik implementation', () => { 
      it('Has a Formik component', () => { 
        expect(componentToTest.find(Formik)).toHaveLength(1);
      });
  
      it('Gives formik initial values', () => {
        expect(componentToTest.find(Formik).prop('initialValues')).toBeDefined();
      });
  
      it('Gives Formik a validationSchema', () => {
        expect(componentToTest.find(Formik).prop('validationSchema')).toBeDefined();
      });

      it('Gives Formik an onSubmit function', () => {
        expect(componentToTest.find(Formik).prop('onSubmit')).toBeDefined();
      });

      it('Gives Formik a render method', () => { 
        expect(componentToTest.find(Formik).prop('render')).toBeDefined();
      });

      it('Gives Formik a render method with at least one FormInput', () => { 
        const testRes = shallow(componentToTest.find(Formik).prop('render')());
        expect(testRes.find(FormInput).length).toBeGreaterThanOrEqual(1);
      });

      it('Gives Formik a render method with one submit-type input', () => { 
        const testRes = shallow(componentToTest.find(Formik).prop('render')());
        expect(testRes.find('input[type="submit"]')).toHaveLength(1);
      });
    });

    const inputs = ['teamName', 'homeLocation'];
    describe('inputs', () => {
      inputs.forEach((name) => {
        it(`has an input for ${name}`, () => {
          expect(componentToTest.find(`input[name="${name}"]`)).toHaveLength(1);
        });

        it(`has a default value of "" for ${name}`, () => {
          expect(componentToTest.find(`input[name="${name}"]`).prop('value')).toBe('');
        });
      });
    });

    describe('labels', () => { 
      it("Has a label for 'teamName'", () => {
        expect(componentToTest.find('label[htmlFor="teamName"]')).toHaveLength(1);
      });

      it("Has label text of 'Team Name'", () => {
        expect(componentToTest.find('label[htmlFor="teamName"]').text()).toBe('Team Name');
      });

      it("Has a label for 'homeLocation'", () => {
        expect(componentToTest.find('label[htmlFor="homeLocation"]')).toHaveLength(1);
      });

      it("Has label text of 'Home Location'", () => {
        expect(componentToTest.find('label[htmlFor="homeLocation"]').text()).toBe('Home Location');
      });
    });

    describe('Submit Handler', () => {
      let handlerToTest;
      const newTeamMock = jest.fn(async (vals) => {
        if(!vals.pass) 
          throw new Error('test')
        
        return { id: 3 }
      });

      beforeEach(() => { 
        handlerToTest = componentToTest.find(Formik).prop('onSubmit');

        SchedulingAPI.mockClear();
        newTeamMock.mockClear();
        SchedulingAPI.mockImplementation(() => { 
          return {
            createNewTeam: newTeamMock
          }
        });
      });

      it('Is a function', () => {
        expect(typeof handlerToTest).toBe('function')
      });

      it('Takes two arguments', () => { 
        expect(handlerToTest).toHaveLength(2);
      });

      it('Calls the createNewTeam method of the SchedulingAPI', async () => {
        expect(newTeamMock).not.toBeCalled();
        Promise.resolve(handlerToTest({pass: true}))
        expect(newTeamMock).toBeCalled();
      });

      it('Calls the createNewTeam method of the SchedulingAPI with the given "values" object', async () => { 
        expect(newTeamMock).not.toBeCalled();
        Promise.resolve(handlerToTest({pass: true}));
        expect(newTeamMock).toBeCalled();
      });

      describe('Successful responses', () => {
        it('Redirects to the supplied team page (with the given ID)', async () => {
          spyOn(Router, 'navigate').and.callFake(() => {});
          expect(Router.navigate).not.toBeCalled();
          await handlerToTest({pass: true}, {setSubmitting: () => {}});
          expect(Router.navigate).toBeCalledWith(appRoutes.teamPage(3));
        });
      });

      describe('Unsuccessful responses', () => { 
        it('Throws and error when the response is unsuccessful', async () => {
          await expect(handlerToTest({ pass: false })).rejects.toThrowError();
        });
      });
    });
  });
});