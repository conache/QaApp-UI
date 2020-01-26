import React from "react";
import ReactDiffViewer from "react-diff-viewer";

const diffStyles = {
  variables: {
    diffViewerBackground: "#1494d9",
    addedBackground: "#1494d9",
    addedColor: "#1494d9",
    removedBackground: "#1494d9",
    removedColor: "#1494d9",
    wordAddedBackground: "#1494d9",
    wordRemovedBackground: "#1494d9"
  }
};

const TextDiff = props => {
  const { oldText, newText } = props;

  return (
    <ReactDiffViewer
      styles={diffStyles}
      oldValue={oldText}
      newValue={newText}
      splitView={true}
      hideLineNumbers={true}
      showDiffOnly={true}
      extraLinesSurroundingDiff={1}
    />
  );
};

class ProposalPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      loading: false,
      proposalId: match.params.id
    };
  }

  render() {
    const { proposalId } = this.state;

    const oldText = `
      This is the final hook added to this release, useRouteMatch gives you access to the match property without rendering a <Route> component.
      It matches the URL just like a Route would and it accepts an exact, strict, path and sensitive options just like a <Route>.
      Before V5.1 the ways to access the match object are through
        `;

    const newText = `
      This is the final hookies added to this release, useRouteMatch gives me some asdasd you access to the match property without rendering a <Route> component.
      It matches the URL just like a Route would and it accepts an exact, strict, path and sensitive options just like a <Route>.
      Before V5.1 the ways to access the matchies object are through. Ypu kno man?
        `;

    return <TextDiff oldText={oldText} newText={newText} />;
  }
}

export default ProposalPage;
