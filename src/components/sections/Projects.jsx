import { useState } from 'react';
import { projects } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const [category, setCategory] = useState('All work');
  const categories = ['All work', ...new Set(projects.map(project => project.category))];
  const filtered = projects.filter(project => category === 'All work' || project.category === category);
  return <section id="creations" className="section wrap creations" aria-labelledby="creations-title"><div className="section-topline"><SectionHeading number="III" eyebrow="SELECTED PROJECTS" title={<span id="creations-title">Creations of<br /><em>the Realm</em></span>} /><p>Healthcare, conversation tools,<br />and software architecture research.</p></div><div className="project-filters" role="group" aria-label="Filter projects">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === 'All work' ? String(projects.length).padStart(2, '0') : String(projects.filter(project => project.category === item).length).padStart(2, '0')}</span></button>)}</div><span className="sr-only" role="status">{filtered.length} projects shown</span><div className="projects-grid">{filtered.map(project => <ProjectCard key={project.id} project={project} />)}</div></section>;
}
