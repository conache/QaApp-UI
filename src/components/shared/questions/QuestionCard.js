import React from 'react';
import {withRouter} from 'react-router-dom';
import { toUpper } from 'ramda';
import moment from 'moment-mini';

// {
//   title: 'Sed porttitor massa purus mauris quis aliquam massa consequat gravida.',
//   body: 'Felis sodales vitae eu arcu donec est. In morbi magna interdum urna. Eleifend faucibus volutpat diam id at ullamcorper. Sit elementum, amet euismod faucibus orci dui. Dolor lobortis diam maecenas dolor semper pellentesque senectus cursus commodo. Ac libero commodo viverra ut justo diam amet nullam venenatis. Elementum feugiat massa morbi et ornare ac. Sem aliquam, urna id id velit ut vitae.',
//   date: '17/01/2020',
//   by: 'Name Surname',
//   votes: 50,
//   answers: 398,
//   tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4'],
// },
const Numbers = ({ number, text, style }) => {
  return (
    <div className="numbers container-center flex-column" style={style}>
      <div>{number}</div>
      <div>{toUpper(text)}</div>
    </div>
  )
}

class QuestionCard extends React.Component {
  render() {
    const { key, question, history } = this.props;
    const { id, votes, answers, title, body, tags, date, by } = question;
    return (
      <div className="question-card d-flex" key={key} >
        <div className="question-card__head">
          <Numbers number={votes} text="votes" style={{ paddingBottom: '35px' }} />
          <Numbers number={answers} text="answers" />
        </div>
        <div className="question-card__body">
          <div className="title" onClick={() => history.push(`question/${id}`)}>{title}</div>
          <div className="body">{body}</div>
          <div className="d-flex">{tags.map(tag => <div className="tag">{tag}</div>)}</div>
          <div className="card-info">asked on {moment(date).format("MMM Do YY")} by {by}</div>
        </div>
      </div>
    );
  }
}


export default withRouter(QuestionCard);
