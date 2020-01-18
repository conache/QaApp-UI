import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import { QUESTIONS_SORT_CRITERIA } from "../../utils/Constants";

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

  changeSortFilter(criteria) {
    this.setState(
      prevState => ({ filters: { ...prevState, sortBy: criteria } }),
      () => this.props.onFilterChange("sortBy", criteria)
    );
  }

  closeFilterMenu() {
    this.setState({menuOpened: false});
  }

  render() {
    const { title } = this.props;
    const { filters, menuOpened } = this.state;

    return (
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
              this.changeSortFilter(QUESTIONS_SORT_CRITERIA.NEWEST)
            }
          />
          <FilterButton
            name="Votes"
            selected={filters.sortBy === QUESTIONS_SORT_CRITERIA.VOTES}
            onClick={() => this.changeSortFilter(QUESTIONS_SORT_CRITERIA.VOTES)}
          />
          <FilterButton
            name="No answers"
            selected={filters.sortBy === QUESTIONS_SORT_CRITERIA.NO_ANSWERS}
            onClick={() =>
              this.changeSortFilter(QUESTIONS_SORT_CRITERIA.NO_ANSWERS)
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
            <Card className="filter-menu">
              <CardContent>
                <RadioGroup aria-label="Sort by" name="sortCriteria">
                  <FormControlLabel
                    checked={filters.sortBy === QUESTIONS_SORT_CRITERIA.NEWEST}
                    value={QUESTIONS_SORT_CRITERIA.NEWEST}
                    control={<Radio color="default"/>}
                    label="Newest"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    checked={filters.sortBy === QUESTIONS_SORT_CRITERIA.VOTES}
                    value={QUESTIONS_SORT_CRITERIA.VOTES}
                    control={<Radio color="default"/>}
                    label="Votes"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    checked={filters.sortBy === QUESTIONS_SORT_CRITERIA.NO_ANSWERS}
                    value={QUESTIONS_SORT_CRITERIA.NO_ANSWERS}
                    control={<Radio color="default"/>}
                    label="No answers"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </CardContent>
              <CardActions>
                <Button size="small">Apply filters</Button>
                <Button size="small" onClick={() => this.closeFilterMenu()}>Cancel</Button>
              </CardActions>
            </Card>
          )}
        </div>
      </Box>
    );
  }
}

export default QuestionsFilter;
