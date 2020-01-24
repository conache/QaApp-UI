import React from "react";
import { TextareaAutosize, Button } from "@material-ui/core";
import { Formik } from "formik";

const EditableText = props => {

  const {content, isEditing, onEditCancel, onEditSubmit} = props;
  const initialValues = {content: content || ''};

  const validate = values => {
      const errors = {};
      if (!values.content || (values.content && !values.content.trim().length)) {
        errors.content = "Required";
      }

      return errors;
  }

  const onSubmit = (values) => {
    onEditSubmit(values.content);
  }


  if (!isEditing) {
    return (
      <div>{content}</div>
    )
  }

  return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        classNam="w-100"
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextareaAutosize
              id="content"
              name="content"
              type="text"
              className="w-100 my-1"
              rowsMin={7}
              rowsMax={10}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
            />
            <Button variant="contained" onClick={onEditCancel}>
              Cancel
            </Button>
            <Button
              className="form-button"
              type="submit"
              color="primary"
              variant="contained"
              disabled={
                (formik.touched && formik.errors.content) || !formik.dirty
              }
            >
              Save
            </Button>
          </form>
        )}
      </Formik>
  );
}

export default EditableText;