import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';

export function AchievementTimeline() {
  return <section id="victories" className="section section-metal" aria-labelledby="victories-title"><div className="wrap split-section"><div><SectionHeading number="IV" eyebrow="MILESTONES ALONG THE WAY" title={<span id="victories-title">Victories</span>} /><p className="serif-lead">Small steps.<br />Lasting marks.</p><Award className="section-emblem" size={85} strokeWidth={0.65} aria-hidden="true" /></div><div className="timeline">{achievements.map((item, i) => <article className="timeline-entry" key={i} data-reveal><span className="timeline-dot" /><div className="timeline-meta"><span>{item.year}</span><span>{item.type}</span></div><h3>{item.title}</h3><p>{item.description}</p>{item.link && <a className="text-link" href={item.link} target="_blank" rel="noreferrer">View achievement <ArrowUpRight size={15} /></a>}</article>)}</div></div></section>;
}

export function ExperienceTimeline() {
  return <section id="chronicles" className="section wrap split-section" aria-labelledby="chronicles-title"><div><SectionHeading number="VI" eyebrow="THE JOURNEY SO FAR" title={<span id="chronicles-title">Chronicles</span>} /><p className="serif-lead">Always learning.<br />Always becoming.</p><GraduationCap className="section-emblem" size={85} strokeWidth={0.65} aria-hidden="true" /></div><div className="timeline">{experience.map((item, i) => <article key={i} className="timeline-entry" data-reveal><span className="timeline-dot" /><div className="timeline-meta"><span>{item.period}</span><span>{item.type}</span></div><h3>{item.title}</h3><h4>{item.organization}</h4><p>{item.description}</p></article>)}</div></section>;
}
