import { request } from './request.js';

export function getProposal(id) {
  return new Promise( (resolve, reject) => {
    setTimeout( () => 
    resolve({
      data: {
        proposal: {
          modelId: "41TB428BxeL1Y2MzWX2e",
          score: 0,
          upVotes: [],
          downVotes: [],
          questionAuthorId: "38be0e72-c5f6-4670-99ad-bfc60a2f0251",
          questionAuthorName: "John Wo",
          groupName: "my-name",
          questionText: "I’m not really really convinced it’s expanding on the whole; it probably *does* an expandation and contraction in a somewhat regular cycle… but it’s overall *output* does continue to increase! (bla bla bla pharasdasd) In a billion to tow billion and a half yearz, the output of the sunz will have rendered the Earth dumb af of supporting life…We have that long to learn spaceflight & get off this rock. I hope we start soon, fucking fagots",
          questionPublishDate: "2020-01-26T21:28:16.188+0000",
          noAnswers: 0,
          questionTags: ["proposed1", "kill23", "Test newly"],
          voteStatus: "NoVote",
          sortBy: "questionPublishDate",
          joinField: "question",
          modelType: "com.project.qa.model.elasticserach.QuestionAsResponse",
        },
        question: {
          modelId: "41TB428BxeL1Y2MzWX2e",
          score: 0,
          upVotes: [],
          downVotes: [],
          questionAuthorId: "38be0e72-c5f6-4670-99ad-bfc60a2f0251",
          questionAuthorName: "John Wo",
          groupName: "my-name",
          questionTitle: "Is it true that the Sun is expanding itself in outer space?",
          questionText: "I’m not sure it’s expanding on the whole; it *does* expand and contract in a somewhat regular cycle… but it’s overall *output* does continue to increase. In a billion to a billion and a half years, the output of the sun will have rendered the Earth incapable of supporting life…We have that long to learn spaceflight & get off this rock. I hope we start soon.",
          questionPublishDate: "2020-01-26T21:28:16.188+0000",
          noAnswers: 0,
          questionTags: ["proposed1", "kill1"],
          voteStatus: "NoVote",
          sortBy: "questionPublishDate",
          joinField: "question",
          modelType: "com.project.qa.model.elasticserach.QuestionAsResponse",
        }
      }
    }), 1000 );

  });
}
export function getProposals(page, pageSize) {
  // this should be replaced by another endpoint
  return request('GET', `question/proposedQuestions?page=${page + 1}&size=${pageSize}`);
}

export function acceptProposal(id) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({message: "Not implemented yet"}),
      1000)
  })
}

export function declineProposal(id) {
  return new Promise((resolve, reject) => {
    resolve({message: "Not implemented yet"})
  })
}