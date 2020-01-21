import React from 'react';
import UpDownVotes from './UpDownVotes';

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
}) => {
  return (
    <div className="answers-container">
      {/* The up-down vote width is 72px */}
      <div style={{ marginLeft: '72px' }}>
        <div className="subtitle">{nrAnswers} answers</div>
        <div className="horizontal-hr" />
      </div>
      {/* TODO: Add pagination component */}
      {answers.map((answer, idx) => <Answer answer={answer} key={idx} />)}
    </div>
  )
}

export default Answers;

const answers = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus etiam sodales pharetra egestas fames ullamcorper. Dui donec vestibulum morbi odio semper consectetur. Tincidunt vel nam duis pharetra lacus facilisis lectus nulla. Magna proin egestas velit morbi nunc, metus.',
  'Cursus augue vitae ullamcorper feugiat bibendum diam tellus velit, sed. Et augue id sed sem adipiscing odio ante fusce. Suspendisse facilisis nibh vulputate est, molestie elementum nulla. Penatibus enim, faucibus imperdiet arcu bibendum quis. Est quam in ullamcorper curabitur facilisis tristique. Nullam at nulla id eleifend sed rhoncus faucibus arcu. Morbi.',
  'Odio mauris hendrerit nulla pharetra turpis pellentesque venenatis integer diam. Viverra risus nunc quam aliquam. Pellentesque turpis nibh etiam ac nulla. A tristique non, elit pellentesque mauris. Elit fames quis aliquet lorem vehicula eu. Iaculis quam pretium urna risus, ipsum ut. Urna commodo tellus nunc morbi diam quam aliquam. Iaculis at amet vitae id ac.',
  // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus etiam sodales pharetra egestas fames ullamcorper. Dui donec vestibulum morbi odio semper consectetur. Tincidunt vel nam duis pharetra lacus facilisis lectus nulla. Magna proin egestas velit morbi nunc, metus.',
  // 'Cursus augue vitae ullamcorper feugiat bibendum diam tellus velit, sed. Et augue id sed sem adipiscing odio ante fusce. Suspendisse facilisis nibh vulputate est, molestie elementum nulla. Penatibus enim, faucibus imperdiet arcu bibendum quis. Est quam in ullamcorper curabitur facilisis tristique. Nullam at nulla id eleifend sed rhoncus faucibus arcu. Morbi.',
  // 'Odio'
]