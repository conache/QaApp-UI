import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Grid
} from "@material-ui/core";
import { getSimilarQuestions } from "../../ducks/search";
import SearchIcon from "@material-ui/icons/Search";
import { pathOr } from "ramda";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.requestTimeoutId = null;
  }

  clearRequestTimeout() {
    if (this.requestTimeoutId) {
      clearTimeout(this.requestTimeoutId);
    }
  }

  handleInputChange(event) {
    const text = event.target.value;
    this.clearRequestTimeout();
    this.requestTimeoutId = setTimeout(() => {
      if (text && text.trim().length) {
        this.props.actions.searchSimilar(text);
      }
    }, 500);
  }

  render() {
    const {
      search: { loading, results },
      history
    } = this.props;

    return (
      <Autocomplete
        className="searchContainer"
        autoComplete
        freeSolo={false}
        disableOpenOnFocus
        loading={loading}
        loadingText="Finding similar questions..."
        noOptionsText="No similar questions found"
        onChange={(event, value) => {
          const questionId = pathOr(null, ["modelId"], value);
          if (!questionId) {
            return;
          }
          history.push(`/dashboard/question/${questionId}`);
        }}
        getOptionLabel={option => option}
        filterOptions={options => options}
        options={pathOr([], ["data"], results)}
        renderOption={option => {
          return (
            <Grid container alignItems="center">
              <Grid item>
                <div>{option.questionTitle}</div>
              </Grid>
            </Grid>
          );
        }}
        renderInput={params => (
          <TextField
            {...params}
            className="searchInput"
            variant="outlined"
            placeholder="Search question..."
            fullWidth
            onChange={e => this.handleInputChange(e)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              )
            }}
          />
        )}
      ></Autocomplete>
    );
  }

  componentWillUnmount() {
    this.clearRequestTimeout();
  }
}

function mapStatetoProps(state) {
  return {
    search: pathOr({}, ["search"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      searchSimilar: text => {
        return dispatch(getSimilarQuestions(text));
      }
    }
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Search));
