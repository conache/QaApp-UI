import React from "react";
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
import { QUESTIONS_SORT_CRITERIA } from "../../utils/Constants";

class QuestionsFilterMenu extends React.Component {
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
            <div className="filter-menu__label">Sort by</div>
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
            <div className="filter-menu__label">By following tags</div>
            <Grid style={{ marginBottom: "60px" }}>
              <Select
                isMulti
                maxMenuHeight={100}
                components={makeAnimated()}
                defaultValue={tags}
                value={tags}
                options={[...tagsOptions]}
                onChange={newTagsList => this.handleTagsChange(newTagsList)}
              />
            </Grid>
            <Box display="flex">
              <Button
                className="filter-menu__btn"
                variant="contained"
                color="primary"
                style={{ marginRight: "auto" }}
                onClick={() => onFilter({ sortBy, tags })}
              >
                Apply filters
              </Button>
              <Button className="filter-menu-btn" onClick={() => onClose()}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Card>
      </ClickAwayListener>
    );
  }
}

export default QuestionsFilterMenu;
