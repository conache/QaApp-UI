import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Autocomplete } from "@material-ui/lab";
import { TextField, InputAdornment, CircularProgress, Grid } from '@material-ui/core';
import {getSimilarQuestions} from '../../ducks/search';
import SearchIcon from '@material-ui/icons/Search';
import { pathOr } from 'ramda';

class Search extends React.Component {
  handleInputChange(event) {
    this.props.actions.searchSimilar(event.target.value);
  }

  render() {
    const {search: {loading, results}, history, location} = this.props;

    return (
      <Autocomplete className="searchContainer"
          autoComplete
          freeSolo={false}
          disableOpenOnFocus
          loading={loading}
          loadingText="Finding similar questions..."
          noOptionsText="No similar questions"
          onChange={(event, value) => {
            const questionId = pathOr(null, ['questionId'], value);
            if (!questionId) {
              return;
            }
            history.push(`/dashboard/question/${questionId}`);
          }}
          getOptionLabel={option => option.text}
          filterOptions={option => option}
          options={pathOr([], ['data'], results)}
          renderOption={
            option => {
              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <div>{option.text}</div>
                  </Grid>
                </Grid>
              );
            }
          }
          renderInput={params => (
            <TextField
              {...params}
              className="searchInput"
              variant="outlined"
              placeholder="Search question..."
              fullWidth
              onChange={(e) => this.handleInputChange(e)}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                    <InputAdornment>
                      <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    { loading ? <CircularProgress color="inherit" size={20} /> : null }
                  </React.Fragment>
                ),
              }}
            />
        )}
      >
      </Autocomplete>
    );
  }
}

function mapStatetoProps(state) {
  return {
    search: pathOr({}, ['search'], state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      searchSimilar: (text) => {return dispatch(getSimilarQuestions(text))}
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(withRouter(Search))