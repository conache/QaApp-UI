import React, {useState} from 'react';
import { Formik } from 'formik';
import { Button, TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAnswer } from '../../ducks/answers';

const initialValues = {
  answer: '',
}

const validate = values => {
  const errors = {};
  if (!values.answer) {
    errors.answer = 'Required';
  }

  return errors;
};

const PostAnswer = (props) => {
  const [positing, setPosting] = useState(false);

  const onSubmit = (values , { resetForm })=> {
    const {questionId, onSuccess, actions: { addAnswer }} = props;
    setPosting(true);
    addAnswer({questionId, answerText: values.answer}).then( () => {
      resetForm(initialValues);
      onSuccess();
    })
    .finally(() => {
      setPosting(false);
    })
  };

  return (
    <div className="post-answer-container ml-72">
      <div className="subtitle">Your answer</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        className="w-100"
        render={formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextareaAutosize
              id="answer"
              name="answer"
              type="text"
              className="w-100 my-1"
              rowsMin={10}
              rowsMax={15}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
            />
            <Button
              className="form-button"
              type="submit"
              color="primary"
              variant="contained"
              disabled={positing || (formik.touched && formik.errors.answer) || !formik.dirty}
            >
              Post Answer
            </Button>
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
      addAnswer: addAnswer,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostAnswer);