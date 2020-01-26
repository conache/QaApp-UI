import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Button, TextField, TextareaAutosize } from "@material-ui/core";
import CustomFormInput from "../shared/CustomFormInput";
import CreatableSelect from "react-select/creatable";
import { filter, reject, isEmpty, isNil, map } from "ramda";
import LoadingSpinner from '../shared/LoadingSpinner';
import { addNewQuestion } from "../../ducks/questions";
import { getAllActiveTags } from "../../ducks/tags";
import { pathOr } from "ramda";
import makeAnimated from "react-select/animated";

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  }

  return errors;
};

const initialValues = {
  title: "",
  body: ""
};

const ALL_QUESTIONS_ROUTE = "/dashboard/all-questions";

class AskQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      proposedTagMessage: ""
    };
  }

  componentDidMount() {
    const {
      actions: { loadTags }
    } = this.props;
    loadTags();
  }

  /**
   * @param { name: string } values
   * @param {object} formikActions - formik helpers
   */
  onSubmit = values => {
    const { actions: {addQuestion}, history } = this.props;
    const { selectedTags } = this.state;
    const { title, body } = values;
    const newTag = tag => tag.__isNew__;

    const questionTags = map(tag => tag.value, reject(newTag, selectedTags));
    const params = {
      questionTitle: title,
      questionText: body,
      questionTags,
      proposedTags: map(tag => tag.value, filter(newTag, selectedTags))
    };

    return addQuestion(params).then(() => {
      history.push(ALL_QUESTIONS_ROUTE)
    });
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
    const { history, tagsOptions, creatingNewQuestion,  } = this.props;

    return (
      <div className="ask-question-container overflow-y">
        {creatingNewQuestion && <LoadingSpinner />}
        <div className="h-100 w-100" style={{ margin: "0 20%" }}>
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
                    <TextField
                      variant="outlined"
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
                      components={makeAnimated()}
                      options={[...(tagsOptions || [])]}
                      placeholder="e.g. (Fun) (Programming) (News) (Procedures)"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      defaultValue={selectedTags}
                      value={selectedTags}
                      onChange={this.handleChange}
                    />
                    <div style={{ color: "#f50057" }}>{proposedTagMessage}</div>
                  </CustomFormInput>
                </div>
                <div className="py-1">
                  <Button
                    className="form-button"
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={creatingNewQuestion}
                  >
                    Post question
                  </Button>
                  <Button
                    className="form-button"
                    onClick={() => history.push(ALL_QUESTIONS_ROUTE)}
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

function mapStateToProps(state) {
  return {
    tagsOptions: pathOr([], ["tags", "activeTags", "data"], state).map(tag => {
      return { value: tag.name, label: tag.name };}),
    creatingNewQuestion: pathOr(false, ["questions", "loadingCreateQuestion"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTags: () => dispatch(getAllActiveTags()),
      addQuestion: (params) => dispatch(addNewQuestion(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
