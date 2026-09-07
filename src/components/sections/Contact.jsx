import { useState } from 'react';
import { ArrowUpRight, Download, Github, Linkedin, Mail, Send } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import ProfileLink from '../ui/ProfileLink';

export default function Contact() {
  const [status, setStatus] = useState('');
  const configured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email);
  const submit = event => {
    event.preventDefault();
    if (!configured) { setStatus('The contact address has not been added yet. Please check back soon.'); return; }
    const values = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`${values.get('subject')} — from ${values.get('name')}`);
    const body = encodeURIComponent(`${values.get('message')}\n\nFrom: ${values.get('name')}\nReply to: ${values.get('email')}`);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    setStatus('Your email app has been requested. Review and send your message there. If nothing opened, use the email link.');
  };
  return <section id="ravens" className="section contact-section" aria-labelledby="contact-title"><div className="wrap contact-grid"><div><SectionHeading number="VII" eyebrow="LET’S BUILD SOMETHING LASTING" title={<span id="contact-title">Send a<br /><em>Raven</em></span>} /><p className="contact-intro">Have an idea, an opportunity,<br />or a good problem to solve?<br /><span>I’d like to hear it.</span></p><ProfileLink href={configured ? `mailto:${portfolio.email}` : null} className="contact-email"><Mail size={18} />{portfolio.email}<ArrowUpRight size={18} /></ProfileLink><div className="contact-socials"><ProfileLink href={portfolio.github}><Github size={18} /> GitHub</ProfileLink><ProfileLink href={portfolio.linkedin}><Linkedin size={18} /> LinkedIn</ProfileLink></div><ProfileLink href={portfolio.resume} download className="button resume-link"><Download size={16} /> Download résumé</ProfileLink></div><form className="contact-form" onSubmit={submit}><span className="form-heading">A NEW CORRESPONDENCE <span>↗</span></span><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="How shall I address you?" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div><label>Subject<input name="subject" placeholder="What brings you here?" required maxLength={150} /></label><label>Your message<textarea name="message" placeholder="Tell me a little about what you have in mind…" rows={5} required maxLength={4000} /></label><div className="form-bottom"><span>{configured ? 'Opens your email app. No data stored.' : 'Contact details coming soon.'}</span><button type="submit" className="button button-primary">Send the Raven <Send size={16} /></button></div><p className="form-status" role="status">{status}</p></form></div></section>;
}
