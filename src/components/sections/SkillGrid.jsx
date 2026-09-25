import ArchiveIcon from '../ui/ArchiveIcon';
import { skills } from '../../data/skills';
import SectionHeading from '../ui/SectionHeading';

export default function SkillGrid() {
  return <section id="skills" className="section section-metal" aria-labelledby="skills-title"><div className="wrap"><div className="section-topline"><SectionHeading number="II" eyebrow="TOOLS OF THE CRAFT" title={<span id="skills-title">Arsenal</span>} /><p>Different tools. One purpose.<br />To build things that matter.</p></div><div className="skills-grid">{skills.map((skill, index) => { return <article className="skill-tile" key={skill.name} data-reveal><div className="skill-top"><ArchiveIcon name={skill.icon} size={46} /><span>0{index + 1}</span></div><h3>{skill.name}</h3><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article>; })}</div></div></section>;
}
