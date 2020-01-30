import {connect} from "react-redux";
import { pathOr } from "ramda";
import { getEditProposal, acceptEditProposal, declineEditProposal } from "../../ducks/proposals";
import ProposalPage from "./ProposalPage";

function mapStateToProps(state) {
  return {
    currentProposal: pathOr(null, ["proposals", "currentProposal"], state),
    loadingProposal: pathOr(true, ["proposals", "loadingProposal"], state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProposal: id => {
        return dispatch(getEditProposal(id))
      },
      acceptProposal: id => {
        return dispatch(acceptEditProposal(id))
      },
      declineProposal: id => {
        return dispatch(declineEditProposal(id))
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalPage)
