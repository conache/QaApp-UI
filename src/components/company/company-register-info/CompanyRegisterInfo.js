import React from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import CustomFormInput from '../../shared/CustomFormInput';
import { NotificationManager } from 'react-notifications';
import { setCompanyGroup } from '../../../api/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../../../ducks/user';


const validate = values => {
  const errors = {};
  if (values.domain.length > 15) {
    errors.domain = 'Must be 15 characters or less';
  }

  return errors;
};

const CompanyRegisterInfo = (props) => {
  const onSubmit = values => {
    const { history, actions: { getUserInfo }, } = props;

    return setCompanyGroup(values.domain).then(() => {
      NotificationManager.success("Company information succesfully added");
      getUserInfo();
      history.push("/");
    }).catch((error) => {
      NotificationManager.error(`Could not add information. Error: ${error.message}`);
    });
  };

  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
      <h2>Register you're company's information</h2>
      <Formik
        initialValues={{
          domain: '',
          companyName: '',
        }}
        onSubmit={onSubmit}
        validate={validate}
        className="w-100"
        render={formik => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-box">
              <CustomFormInput
                formik={formik}
                labelTitle="Domain"
                labelDescription="This will define the domain for the company platform"
              >
                <TextField variant="outlined"
                  id="domain"
                  name="domain"
                  type="text"
                  required
                  placeholder="e.g. coca-cola"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />

              </CustomFormInput>
              <CustomFormInput
                formik={formik}
                labelTitle="Company Name"
                labelDescription="Your company name"
              >
                <TextField variant="outlined"
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="e.g. Coca Cola"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </CustomFormInput>
            </div>
            <Button className="form-button" type="submit" color="primary" variant="contained">Save</Button>
          </form>
        )}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserInfo: getUserInfo,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyRegisterInfo);