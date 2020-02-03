// Enthusiast - Visit the site each day for 30 consecutive days. (Days are counted in UTC.) 224.5k awarded
// Fanatic - Visit the site each day for 100 consecutive days. (Days are counted in UTC.) 33.7k awarded
// GoldenHero - Earn at least 200 reputation (the daily maximum) in a single day 37.8k awarded
// Epic - Earn 200 daily reputation 50 times 716 awarded
// Legendary -  Earn 200 daily reputation 150 times
// https://stackoverflow.com/help/badges

import React from 'react';
import LegendaryBadge from '../../assets/Legendary.svg'
import EpicBadge from '../../assets/Epic.svg';
import GoldenHeroBadge from '../../assets/GoldenHero.svg';
import FanaticBadge from '../../assets/Fanatic.svg';
import EnthusiastBadge from '../../assets/Enthusiast.svg';

const getBadgeStatus = (score) => {
  switch (score) {
    case score < 10:
      return {
        label: 'Enthusiast',
        icon: EnthusiastBadge,
      }
    case score > 10 && score < 20:
      return {
        label: 'Fanatic',
        icon: FanaticBadge,
      }
    case score > 20 && score < 30:
      return {
        label: 'Legendary',
        icon: LegendaryBadge,
      }
    case score > 30 && score < 40:
      return {
        label: 'Epic',
        icon: EpicBadge,
      }
    case score > 40 && score < 50:
      return {
        label: 'GoldenHero',
        icon: GoldenHeroBadge,
      }
    default:
      return {
        label: 'Enthusiast',
        icon: EnthusiastBadge,
      }
  }
}

const Badge = (score = 0) => {
  const badgeInfo = getBadgeStatus(score);
  return (
    <div className="badge container-center">
      <small>{badgeInfo.label}</small>
      <img src={badgeInfo.icon} alt="" />
    </div>
  )
}

export default Badge;