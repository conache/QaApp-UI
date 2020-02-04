import LegendaryBadge from '../../assets/Legendary.svg'
import EpicBadge from '../../assets/Epic.svg';
import GoldenHeroBadge from '../../assets/GoldenHero.svg';
import FanaticBadge from '../../assets/Fanatic.svg';
import BeginnerBadge from '../../assets/Enthusiast.svg';

export const DEFAULT_PAGE_SIZE = 3;
export const QUESTIONS_SORT_CRITERIA = {
  NEWEST: "questionPublishDate",
  VOTES: "score",
  NO_ANSWERS: "noAnswers"
};
export const VOTE_SATUS = {
  UPVOTE: "UpVote",
  DOWNVOTE: "DownVote",
  NO_VOTE: "NoVote"
}

export const BADGES = [
  {
    label: "Beginner",
    icon: BeginnerBadge,
    minScore: 0,
    maxScore: 1
  },
  {
    label: "Fanatic",
    icon: FanaticBadge,
    minScore: 1,
    maxScore: 3
  },
  {
    label: "Legendary",
    icon: LegendaryBadge,
    minScore: 3,
    maxScore: 10
  },
  {
    label: 'Epic',
    icon: EpicBadge,
    minScore: 10,
    maxScore: 20
  },
  {
    label: 'Hero',
    icon: GoldenHeroBadge,
    minScore: 20,
    maxScore: Infinity
  }
]