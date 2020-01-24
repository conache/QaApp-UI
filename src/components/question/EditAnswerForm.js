import React, { useState } from "react";
import { connect } from "react-redux";
import { TextareaAutosize, Button } from "@material-ui/core";
import { Formik } from "formik";
import { editAnswer } from "../../ducks/answers";
import LoadingSpinner from "../shared/LoadingSpinner";

const EditAnswerForm = props => {
  const [loading, setLoading] = useState(false);
  const {
    answer,
    onCancel,
    onSuccess,
    actions: { editAnswer }
  } = props;

  const initialValues = { answerText: answer.answerText };

  const validate = values => {
    const errors = {};
    if (!values.answerText) {
      errors.answerText = "Required";
    }

    return errors;
  };

  const onSubmit = (values, { resetForm }) => {
    const { answerText } = values;
    const { questionId, modelId } = answer;

    setLoading(true);
    editAnswer({ questionId, modelId, answerText })
      .then(() => {
        setLoading(false);
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      {loading && <LoadingSpinner />}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        classNam="w-100"
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextareaAutosize
              id="answerText"
              name="answerText"
              type="text"
              className="w-100 my-1"
              rowsMin={7}
              rowsMax={10}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answerText}
            />
            <Button variant="contained" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className="form-button"
              type="submit"
              color="primary"
              variant="contained"
              disabled={
                (formik.touched && formik.errors.answer) || !formik.dirty
              }
            >
              Save
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      editAnswer: params => dispatch(editAnswer(params))
    }
  };
}

export default connect(null, mapDispatchToProps)(EditAnswerForm);
