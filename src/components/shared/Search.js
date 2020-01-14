import React from 'react';
import { connect } from 'react-redux';
import { Autocomplete } from "@material-ui/lab";
import { TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import {getSimilarQuestions} from '../../ducks/search';
import SearchIcon from '@material-ui/icons/Search';
import { bindActionCreators } from 'redux';
import { pathOr } from 'ramda';

class Search extends React.Component {
  handleInputChange(event) {
    this.props.actions.searchSimilar(event.target.value);
  }

  render() {
    const {search: {loading, results}} = this.props;
    return (
      <Autocomplete className="searchContainer"
          autoComplete
          includeInputInList
          freeSolo
          disableOpenOnFocus
          loading={loading}
          options={pathOr([], ['data'], results)}
          renderOption={
            option => option.text
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
)(Search)