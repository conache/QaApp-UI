import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Button, TextareaAutosize } from "@material-ui/core";
import CustomFormInput from "../shared/CustomFormInput";
import CreatableSelect from "react-select/creatable";
import { filter, reject, isEmpty, isNil, map, pathOr } from "ramda";
import makeAnimated from "react-select/animated";

const formatTags = tags => {
  return tags.map(tag => {return { value: tag, label: tag };});
}

class EditQuestionTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: formatTags(props.question.questionTags),
      proposedTagMessage: ""
    };
  }

  onSubmit = values => {
    const { onSave } = this.props;
    const { selectedTags } = this.state;
    const { body } = values;
    const newTag = tag => tag.__isNew__;

    const questionTags = map(tag => tag.value, reject(newTag, selectedTags));
    const params = {
      questionText: body,
      questionTags,
      proposedTags: map(tag => tag.value, filter(newTag, selectedTags))
    };

    onSave(params);
  };

  handleChange = (selectedTags, actionMeta) => {
    this.setState({ selectedTags }, () => {
      if (isNil(selectedTags)) {
        this.setState({ proposedTagMessage: "" });
      } else if (
        !isEmpty(selectedTags) &&
        isEmpty(filter(tag => tag.__isNew__, selectedTags))
      ) {
        this.setState({ proposedTagMessage: "" });
      }
    });

    if (actionMeta.action === "create-option") {
      this.setState({
        proposedTagMessage:
          "The proposed tags will have to be accepted by an administrator"
      });
    }
  };

  render() {
    const { selectedTags, tagError, proposedTagMessage } = this.state;
    const { question, modalTitle, onDiscard, tagsOptions } = this.props;
    const { questionTitle, questionText } = question
    const initialValues = {
      body: questionText || ""
    };

    return (
      <div className="edit-question">
        <div className="h-100 w-100">
          <h2>{modalTitle}</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            className="w-100"
            render={formik => (
              <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '0.5rem' }}>Title</div>
                <div>{questionTitle}</div>

                <CustomFormInput
                  formik={formik}
                  labelTitle="Body"
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
                  customError={tagError}
                >
                  <CreatableSelect
                    id="tags"
                    name="tags"
                    isMulti
                    components={makeAnimated()}
                    options={[...tagsOptions || []]}
                    placeholder="e.g. (Fun) (Programming) (News) (Procedures)"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    defaultValue={selectedTags}
                    value={selectedTags}
                    onChange={this.handleChange}
                  />
                  <div style={{ color: "#f50057" }}>{proposedTagMessage}</div>
                </CustomFormInput>
                <div className="py-1 buttons">
                  <Button
                    className="form-button"
                    type="submit"
                    color="primary"
                    variant="contained"
                  // disabled={creatingNewQuestion}
                  >
                    Save
                  </Button>
                  <Button
                    className="form-button"
                    onClick={onDiscard}
                  >
                    Discard
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default (EditQuestionTemplate);