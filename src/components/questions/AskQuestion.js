import React from 'react';
import { useFormik } from 'formik';
import { Button, Input } from '@material-ui/core';

const validate = values => {
  const errors = {};
  if (values.domain.length > 15) {
    errors.domain = 'Must be 15 characters or less';
  }

  return errors;
};

const AskQuestion = () => {
  const formik = useFormik({
    initialValues: {
      domain: '',
      companyName: '',
    },
    validate,
    onSubmit: values => {
      // TODO: here goes a request for the add-company-info. an action
    },
  });
  return (
    <div className="ask-question-container">
      <div className="h-100">
        <h2>Ask a question</h2>
        <div className="form-box">
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

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
