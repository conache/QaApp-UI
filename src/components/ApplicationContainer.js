import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../ducks/user';

import Application from './Application';
import { pathOr } from 'ramda';

function mapStateToProps(state) {
  return {
    app: state.app,
    // user: pathOr({}, ['user', 'profile'], state);
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // loadDataUser: getUserInfo,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
