import React from 'react';
import { Formik } from 'formik';
import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import CustomFormInput from '../CustomFormInput';
import CreatableSelect from 'react-select/creatable';
import { filter, reject, isEmpty, isNil, map } from 'ramda';
import { addQuestion } from '../../../api/questions';
import { NotificationManager } from 'react-notifications';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }

  return errors;
};

const initialValues = {
  title: '',
  body: '',
};


class AskQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTags: [],
      proposedTagMessage: '',
    }
  }

  /**
* @param { name: string } values
* @param {object} formikActions - formik helpers
*/
  onSubmit = (values) => {
    const { history } = this.props;
    const { selectedTags } = this.state;
    const { title, body } = values;
    const newTag = tag => tag.__isNew__;

    const questionTags = map(tag => tag.value, reject(newTag, selectedTags));
    const params = {
      questionTitle: title,
      questionText: body, 
      questionTags,
      // extraTags: map(tag => tag.value, filter(newTag, selectedTags))),
    }
    return addQuestion(params).then(() => {
      NotificationManager.success("Question succesfully added");
      history.push("/");
    }).catch((error) => {
      NotificationManager.error(`Could not ask question. Error: ${error.message}`);
    });
  }

  handleChange = (selectedTags, actionMeta) => {
    this.setState(
      { selectedTags },
      () => {
        if (isNil(selectedTags)) {
          this.setState({ proposedTagMessage: ''});
        } else if (!isEmpty(selectedTags) && isEmpty(filter(tag => tag.__isNew__, selectedTags))) {
          this.setState({ proposedTagMessage: ''});
        }
      }
    );

    if (actionMeta.action === "create-option") {
      this.setState({ proposedTagMessage: 'The proposed tags will have to be accepted by an administrator'});
    }
    
  };

  render() {
    const { selectedTags, tagError, proposedTagMessage } = this.state;
    const { history } = this.props;
    
    return (
      <div className="ask-question-container overflow-y">
        <div className="h-100 w-100" style={{ margin: '0 20%' }}>
          <h2>Ask a question</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validate={validate}
            className="w-100"
            render={formik => (
              <form onSubmit={formik.handleSubmit}>
                <div className="form-box">
                  <CustomFormInput
                    formik={formik}
                    labelTitle="Title"
                    labelDescription="Be specific and clear with the question you are going to ask"
                  >
                    <TextField variant="outlined"
                      id="title"
                      name="title"
                      type="text"
                      required
                      placeholder="e.g. Lacus, gravida condimentum eros, erat?"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />
                  </CustomFormInput>

                  <CustomFormInput
                    formik={formik}
                    labelTitle="Body"
                    labelDescription="Include as many information so that someone could answer to your question"
                  >
                    <TextareaAutosize
                      id="body"
                      name="body"
                      type="text"
                      rowsMin={10}
                      rowsMax={20}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.body}
                    />
                  </CustomFormInput>

                  <CustomFormInput
                    formik={formik}
                    labelTitle="Tags"
                    labelDescription="Add tags to describe what is your question about"
                    customError={tagError}
                  >
                    <CreatableSelect
                      id="tags"
                      name="tags"
                      isMulti
                      options={tags}
                      placeholder="e.g. (Tortor) (imperdiet) (sed) (libero)"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedTags}
                      onChange={this.handleChange}
                    />
                    <div style={{ color: '#f50057' }}>{proposedTagMessage}</div>
                  </CustomFormInput>
                </div>
                <div className="py-1">
                  <Button className="form-button" type="submit" color="primary" variant="contained">Post question</Button>
                  <Button className="form-button" onClick={() => history.push("/")}>Discard</Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
};

export default AskQuestion;

const tags = [
  { value: 'tag 1', label: 'Tag 1' },
  { value: 'tag 2', label: 'Tag 2' },
  { value: 'tag 3', label: 'Tag 3' },
  { value: 'tag 4', label: 'Tag 4' },
];