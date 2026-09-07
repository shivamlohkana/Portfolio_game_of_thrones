import { ArrowUpRight, Github, Layers, Fingerprint, Orbit } from 'lucide-react';
import AssetImage from './AssetImage';
import ProfileLink from './ProfileLink';

const motifs = { vault: Layers, sentinel: Fingerprint, atlas: Orbit };
export default function ProjectCard({ project }) {
  const Icon = motifs[project.motif] || Layers;
  return <article className={`project-card ${project.featured ? 'featured' : ''}`} data-reveal><div className="project-visual"><AssetImage src={project.image} alt={`${project.title} project preview`} className={`project-image ${project.motif}`}><div className="project-placeholder"><div className="project-diagram"><Icon strokeWidth={0.65} /><span>{project.title}</span><small>[PROJECT PREVIEW]</small></div><div className="project-preview-meta"><span>ARCHIVE / {project.id}</span><span>DESIGN & ENGINEERING</span></div></div></AssetImage>{project.featured && <span className="featured-label"><span /> FEATURED CREATION</span>}<span className="project-number">{project.id}</span></div><div className="project-info"><div className="project-category">{project.category}{project.placeholder && <span>DEMO CONTENT</span>}</div><h3>{project.title}</h3><p>{project.description}</p><ul className="tech-stack">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="project-links"><ProfileLink href={project.demo} className="text-link">Live demo <ArrowUpRight size={16} /></ProfileLink><ProfileLink href={project.github} className="text-link"><Github size={16} /> Source code</ProfileLink></div></div></article>;
}
