import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  ClickAwayListener
} from "@material-ui/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TuneIcon from "@material-ui/icons/Tune";
import { QUESTIONS_SORT_CRITERIA } from "../../utils/Constants";
import { pathOr } from "ramda";
import { getAllActiveTags } from "../../../ducks/tags";
const FilterButton = props => {
  const { name, selected, onClick } = props;
  return (
    <Button
      className={{ "filter-button": true, selected: selected }}
      variant="contained"
      onClick={() => !selected && onClick()}
    >
      {name}
    </Button>
  );
};

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.filters
    };
  }

  handleSortCriteriaChange(event) {
    this.setState({ sortBy: event.target.value });
  }

  handleTagsChange(tagsList) {
    this.setState({ tags: tagsList });
  }

  render() {
    const { sortBy, tags } = this.state;
    const { onClose, onFilter, tagsOptions } = this.props;

    return (
      <ClickAwayListener onClickAway={() => onClose()}>
        <Card className="filter-menu">
          <Grid container direction="column">
            <div className="filter-menu-label">Sort by</div>
            <Grid container direction="row">
              <RadioGroup
                value={sortBy}
                onChange={e => this.handleSortCriteriaChange(e)}
                style={{ marginBottom: "15px" }}
                aria-label="Sort by"
                name="sortCriteria"
                row
              >
                <FormControlLabel
                  value={QUESTIONS_SORT_CRITERIA.NEWEST}
                  control={<Radio color="default" />}
                  label="Newest"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value={QUESTIONS_SORT_CRITERIA.VOTES}
                  control={<Radio color="default" />}
                  label="Votes"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value={QUESTIONS_SORT_CRITERIA.NO_ANSWERS}
                  control={<Radio color="default" />}
                  label="No answers"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
            <div className="filter-menu-label">By following tags</div>
            <Grid style={{ marginBottom: "60px" }}>
              <Select
                isMulti
                maxMenuHeight={100}
                closeMenuOnSelect={false}
                components={makeAnimated()}
                defaultValue={tags}
                value={tags}
                options={[...tagsOptions]}
                onChange={newTagsList => this.handleTagsChange(newTagsList)}
              />
            </Grid>
            <Box display="flex">
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: "auto" }}
                onClick={() => onFilter({ sortBy, tags })}
              >
                Apply filters
              </Button>
              <Button size="small" onClick={() => onClose()}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Card>
      </ClickAwayListener>
    );
  }
}

class QuestionsFilter extends React.Component {
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
    const { title, tagsOptions } = this.props;
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
              style={{ marginLeft: "1rem" }}
            >
              Filter
            </Button>

            {menuOpened && (
              <FilterMenu
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsFilter);
