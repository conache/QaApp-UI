// Enthusiast - Visit the site each day for 30 consecutive days. (Days are counted in UTC.) 224.5k awarded
// Fanatic - Visit the site each day for 100 consecutive days. (Days are counted in UTC.) 33.7k awarded
// GoldenHero - Earn at least 200 reputation (the daily maximum) in a single day 37.8k awarded
// Epic - Earn 200 daily reputation 50 times 716 awarded
// Legendary -  Earn 200 daily reputation 150 times
// https://stackoverflow.com/help/badges

import React from 'react';
import { BADGES } from "./Constants";

const getBadgeStatus = (score) => {
  return BADGES.find(badge => badge.minScore <= score && score < badge.maxScore);
}

const Badge = ({score}) => {
  const badgeInfo = getBadgeStatus(score || 0);
  return (
    <div className="badge container-center">
      <small>{badgeInfo.label}</small>
      <img src={badgeInfo.icon} alt="" />
    </div>
  )
}

export default Badge;