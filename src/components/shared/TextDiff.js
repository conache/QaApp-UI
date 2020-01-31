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
      useDarkTheme={false}
    />
  );
};

export default TextDiff;
