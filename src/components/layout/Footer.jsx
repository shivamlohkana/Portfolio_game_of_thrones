import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import ProfileLink from '../ui/ProfileLink';

export default function Footer() {
  const email = portfolio.email.includes('@') ? `mailto:${portfolio.email}` : null;
  return <footer className="footer wrap"><div className="footer-top"><a className="footer-name" href="#realm">{portfolio.name}</a><p>The realm remembers what we build.</p><a className="back-top" href="#realm" aria-label="Back to top"><ArrowUp size={18} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</span><div className="socials"><ProfileLink href={portfolio.github}><Github size={16} /><span>GitHub</span></ProfileLink><ProfileLink href={portfolio.linkedin}><Linkedin size={16} /><span>LinkedIn</span></ProfileLink><ProfileLink href={email}><Mail size={16} /><span>Email</span></ProfileLink></div><span className="footer-edition">PERSONAL ARCHIVE · VOL. I</span></div></footer>;
}
