import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CustomFormInput = (props) => {
  const {
    labelTitle,
    labelDescription,
    formik,
    required,
    baseClassName,
    errorClass,
    children,
  } = props;

  const hasError = formik.touched.domain && formik.errors.domain;
  return (
    <div className={classnames('d-flex flex-column', baseClassName)}>
      {labelTitle && (
        <label>
          {labelTitle}
          {required && ' *'}
        </label>
      )}
      <small>{labelDescription}</small>
      {children}
      {hasError && <div className={`invalid-feedback d-block ${errorClass}`}>{formik.errors.domain}</div>}
    </div>
  );
}

export default CustomFormInput;

CustomFormInput.propTypes = {
  children: PropTypes.node.isRequired,
  formik: PropTypes.object.isRequired,
  labelTitle: PropTypes.string,
  labelDescription: PropTypes.string,
  required: PropTypes.bool,
  baseClassName: PropTypes.string,
  errorClass: PropTypes.string,
};

CustomFormInput.defaultProps = {
  children: null,
  labelTitle: '',
  labelDescription: '',
  required: false,
  baseClassName: 'form-group',
  errorClass: '',
};
