import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import ProfileLink from '../ui/ProfileLink';

export default function BattleRecords() {
  return <section className="section wrap battle-records" aria-labelledby="records-title"><SectionHeading number="V" eyebrow="CONSISTENCY, MADE VISIBLE" title={<span id="records-title">Battle Records</span>} /><div className="stats-grid">{portfolio.stats.map(stat => <div key={stat.label} className="stat" data-reveal><strong>{stat.value}</strong><span>{stat.label}</span><small>{stat.note}</small>{stat.profile && <ProfileLink href={portfolio[stat.profile]} className="stat-link">{stat.profile === 'github' ? 'GitHub' : stat.profile === 'leetcode' ? 'LeetCode' : 'CodeChef'} <ArrowUpRight size={14} /></ProfileLink>}</div>)}</div></section>;
}
