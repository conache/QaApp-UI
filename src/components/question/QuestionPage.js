import React from 'react';

class QuestionPage extends React.Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        Question id: {match.params.id}
      </React.Fragment>
    )
  }
}

export default QuestionPage;