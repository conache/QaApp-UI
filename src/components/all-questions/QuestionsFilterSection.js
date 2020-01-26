import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import { QUESTIONS_SORT_CRITERIA } from "../utils/Constants";
import { pathOr } from "ramda";
import { getAllActiveTags } from "../../ducks/tags";
import FilterButton from "../shared/FilterButton";
import QuestionsFilterMenu from './QuestionsFilterMenu';

class QuestionsFilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpened: false,
      filters: {
        sortBy: QUESTIONS_SORT_CRITERIA.NEWEST,
        tags: []
      }
    };
  }

  componentDidMount() {
    const {
      actions: { loadTags }
    } = this.props;
    loadTags();
  }

  applyFilters(newFilters) {
    this.setState(
      prevState => ({ filters: { ...prevState.filters, ...newFilters } }),
      () => this.props.onFiltersChange(newFilters)
    );
  }

  changeSortFilter(criteria) {
    this.applyFilters({ sortBy: criteria });
  }

  closeFilterMenu() {
    this.setState({ menuOpened: false });
  }

  render() {
    const { title, tagsOptions, numbrOfQuestions } = this.props;
    const { filters, menuOpened } = this.state;

    return (
      <React.Fragment>
        <Box
          className="header-question"
          display="flex"
          justifyContent="space-between"
        >
          <h3>{title}</h3>
          <div className="filters-container align-center">
            {numbrOfQuestions > 0 && <div style={{ marginRight: '24px' }}>{numbrOfQuestions} questions</div>}
            <FilterButton
              name="Newest"
              selected={filters.sortBy === QUESTIONS_SORT_CRITERIA.NEWEST}
              onClick={() =>
                this.applyFilters({ sortBy: QUESTIONS_SORT_CRITERIA.NEWEST })
              }
            />
            <FilterButton
              name="Votes"
              selected={filters.sortBy === QUESTIONS_SORT_CRITERIA.VOTES}
              onClick={() =>
                this.applyFilters({ sortBy: QUESTIONS_SORT_CRITERIA.VOTES })
              }
            />
            <FilterButton
              name="No answers"
              selected={filters.sortBy === QUESTIONS_SORT_CRITERIA.NO_ANSWERS}
              onClick={() =>
                this.applyFilters({
                  sortBy: QUESTIONS_SORT_CRITERIA.NO_ANSWERS
                })
              }
            />
            <Button
              onClick={() =>
                this.setState(prevState => ({
                  menuOpened: !prevState.menuOpened
                }))
              }
              style={{ marginLeft: "1rem" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              variant="contained"
              className={{ "filter-button": true, selected: menuOpened }}
              endIcon={<TuneIcon />}
            >
              Filter
            </Button>

            {menuOpened && (
              <QuestionsFilterMenu
                tagsOptions={tagsOptions || []}
                filters={filters}
                onFilter={filters => {
                  this.closeFilterMenu();
                  this.applyFilters(filters);
                }}
                onClose={() => this.closeFilterMenu()}
              />
            )}
          </div>
        </Box>
        {filters.tags?.length > 0 && (
          <Box className="header-question" display="flex">
            <div className="filter-tags-label">Selected tags:</div>
            {filters.tags.map(tag => (
              <div className="tag">{tag.label}</div>
            ))}
          </Box>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    tagsOptions: pathOr([], ["tags", "activeTags", "data"], state).map(tag => {
      return { value: tag.name, label: tag.name };
    })
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTags: () => dispatch(getAllActiveTags())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsFilterSection);
