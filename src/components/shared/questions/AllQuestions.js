import React from 'react';
import QuestionCard from './QuestionCard';
import HeaderQuestionPage from './HeaderQuestionPage';

class AllQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="all-questions d-flex flex-column h-100" style={{ padding: '24px' }}>
        <HeaderQuestionPage 
          title="All questions page"
        />
        {/* {questions.map((question, idx) =>
          <QuestionCard question={question} key={idx}/>
        )} */}
      </div>
    );
  }
}

export default AllQuestions;

const questions = [
  {
    id: 1,
    title: 'Sed porttitor massa purus mauris quis aliquam massa consequat gravida.',
    body: 'Felis sodales vitae eu arcu donec est. In morbi magna interdum urna. Eleifend faucibus volutpat diam id at ullamcorper. Sit elementum, amet euismod faucibus orci dui. Dolor lobortis diam maecenas dolor semper pellentesque senectus cursus commodo. Ac libero commodo viverra ut justo diam amet nullam venenatis. Elementum feugiat massa morbi et ornare ac. Sem aliquam, urna id id velit ut vitae.',
    date: '01/17/2020',
    by: 'Name Surname',
    votes: 50,
    answers: 398,
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4'],
  },
  {
    id: 2,
    title: 'Sed porttitor massa purus mauris quis aliquam massa consequat gravida.',
    body: 'Felis sodales vitae eu arcu donec est. In morbi magna interdum urna. Eleifend faucibus volutpat diam id at ullamcorper. Sit elementum, amet euismod faucibus orci dui. Dolor lobortis diam maecenas dolor semper pellentesque senectus cursus commodo. Ac libero commodo viverra ut justo diam amet nullam venenatis. Elementum feugiat massa morbi et ornare ac. Sem aliquam, urna id id velit ut vitae.',
    date: '01/05/2020',
    by: 'Name Surname',
    votes: 200,
    answers: 79,
    tags: ['tag 1', 'tag 2', 'tag 4'],
  },
  {
    id: 3,
    title: 'Sed porttitor massa purus mauris quis aliquam massa consequat gravida.',
    body: 'Felis sodales vitae eu arcu donec est. In morbi magna interdum urna. Eleifend faucibus volutpat diam id at ullamcorper. Sit elementum, amet euismod faucibus orci dui. Dolor lobortis diam maecenas dolor semper pellentesque senectus cursus commodo. Ac libero commodo viverra ut justo diam amet nullam venenatis. Elementum feugiat massa morbi et ornare ac. Sem aliquam, urna id id velit ut vitae.',
    date: '05/12/2019',
    by: 'Name Surname',
    votes: 50,
    answers: 398,
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4'],
  }
]