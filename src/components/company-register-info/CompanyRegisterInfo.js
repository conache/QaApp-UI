import React from 'react';
import { useFormik } from 'formik';
import { Button, Input  } from '@material-ui/core';

const validate = values => {
  const errors = {};
  if (values.domain.length > 15) {
    errors.domain = 'Must be 15 characters or less';
  }

  return errors;
};

const CompanyRegisterInfo = () => {
  const formik = useFormik({
    initialValues: {
      domain: '',
      companyName: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      // TODO: here goes a request for the add-company-info. an action
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input 
        id="domain"
        name="domain"
        type="text"
        placeholder="Domain"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.domain && formik.errors.domain ? (
        <div>{formik.errors.domain}</div>
      ) : null}

      <Input 
        id="companyName"
        name="companyName"
        type="text"
        placeholder="Company Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CompanyRegisterInfo;
