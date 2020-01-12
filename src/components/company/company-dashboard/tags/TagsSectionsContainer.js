import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TagsSection from './TagsSection';
import { getTags, deleteTag, addTag, editTag } from '../../../../ducks/tags';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllTags: getTags,
    }, dispatch),
    deleteTag: (id) => { return dispatch(deleteTag(id)) },
    addTag: (params) => { return dispatch(addTag(params)) },
    editTag: (params) => { return dispatch(editTag(params)) },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsSection);
