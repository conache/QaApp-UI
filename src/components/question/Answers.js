import React from 'react';
import UpDownVotes from './UpDownVotes';
import PaginatedComponent from '../shared/PaginatedComponent';

const Answer = ({ answer, key }) => {
  return (
    <div className="answer w-100 d-flex" key={key}>
      <UpDownVotes small classContainer="container-center d-flex flex-column" />
      <div className="d-flex flex-column w-100">
        <div className="answer-text">{answer}</div>
        <div className="horizontal-hr" />
      </div>
    </div>
  )
}

const Answers = ({
  nrAnswers = 3,
  answers,
}) => {
  return (
    <div className="answers-container">
      {/* The up-down vote width is 72px */}
      <div style={{ marginLeft: '72px' }}>
        <div className="subtitle">{nrAnswers} answers</div>
        <div className="horizontal-hr" />
      </div>
      {/* TODO: Add pagination component */}
      {/* <PaginatedComponent
        style={{ marginRight: "auto" }}
        label="answers"
        count={totalElements}
        page={page}
        pageSize={pageSize}
        onPageChange={page => this.onPageChange(page)}
      >
        {answers.map((answer, idx) => <Answer answer={answer} key={idx} />)}
      </PaginatedComponent> */}

      {answers.map((answer, idx) => <Answer answer={answer} key={idx} />)}
    </div>
  )
}

export default Answers;