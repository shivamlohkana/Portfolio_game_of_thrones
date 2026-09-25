import { GraduationCap, MapPin, MoveUpRight } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import AssetImage from '../ui/AssetImage';

export default function Origins() {
  return <section id="origins" className="section wrap origins origins-with-cover" aria-labelledby="origins-title"><div className="origins-cover-column book-reveal"><AssetImage src={portfolio.originsCover} alt={`Black and gold portfolio cover for ${portfolio.name}`} className="origins-cover" /></div><div className="origins-copy"><SectionHeading number="I" eyebrow="THE PERSON BEHIND THE WORK" title={<span id="origins-title">Origins</span>} /><p className="serif-lead" data-reveal>Every great creation begins<br />with a restless mind.</p><p className="body-copy" data-reveal>{portfolio.bio}</p><div className="origin-details" data-reveal><div><GraduationCap size={18} /><span><b>{portfolio.role}</b><small>{portfolio.education}</small></span></div><div><MapPin size={18} /><span>{portfolio.location}</span></div></div><div className="interests" data-reveal>{portfolio.interests.map(item => <span key={item}>{item}</span>)}</div><blockquote data-reveal>“{portfolio.philosophy}”</blockquote><a className="text-link" href="#chronicles">Read the chronicles <MoveUpRight size={15} /></a></div></section>;
}
