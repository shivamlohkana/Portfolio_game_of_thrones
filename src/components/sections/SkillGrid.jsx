import { Code2, PanelsTopLeft, Server, Database, BrainCircuit, Terminal, Network, Compass } from 'lucide-react';
import { skills } from '../../data/skills';
import SectionHeading from '../ui/SectionHeading';

const icons = { code: Code2, layout: PanelsTopLeft, server: Server, database: Database, brain: BrainCircuit, terminal: Terminal, network: Network, compass: Compass };
export default function SkillGrid() {
  return <section id="skills" className="section section-metal" aria-labelledby="skills-title"><div className="wrap"><div className="section-topline"><SectionHeading number="II" eyebrow="TOOLS OF THE CRAFT" title={<span id="skills-title">Arsenal</span>} /><p>Different tools. One purpose.<br />To build things that matter.</p></div><div className="skills-grid">{skills.map((skill, index) => { const Icon = icons[skill.icon]; return <article className="skill-tile" key={skill.name} data-reveal><div className="skill-top"><Icon size={25} strokeWidth={1.3} /><span>0{index + 1}</span></div><h3>{skill.name}</h3><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article>; })}</div></div></section>;
}
