import React from 'react';
import { useFormik } from 'formik';
import { Button, ButtonBase , TextField, TextareaAutosize, Chip } from '@material-ui/core';
import CustomFormInput from './CustomFormInput';
import Autocomplete from '@material-ui/lab/Autocomplete';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }

  return errors;
};

const AskQuestion = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validate,
    onSubmit: values => {
      console.log(values)
    },
  });
  return (
    <div className="ask-question-container">
      <div className="h-100">
        <h2>Ask a question</h2>
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
            >
              <Autocomplete
                multiple
                options={tags}
                id="tags"
                name="tags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
                getOptionLabel={option => option.title}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.title} {...getTagProps({ index })} disabled={index === 0} />
                  ))
                }
                style={{ width: 500 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="e.g. (Tortor) (imperdiet) (sed) (libero)"
                    fullWidth
                  />
                )}
              />
            </CustomFormInput>
          </div>
          <div className="py-1">
            <Button type="submit" color="primary" variant="contained">Post question</Button>
            <Button onClick={() => window.location = "/"}>Discard</Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AskQuestion;

const tags = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
]