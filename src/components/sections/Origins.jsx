import { useLayoutEffect, useRef } from 'react';
import { GraduationCap, MapPin, MoveUpRight } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import './Origins.css';

export default function Origins() {
  const letter = useRef(null);
  const copy = useRef(null);

  useLayoutEffect(() => {
    // Keep the writing inside the ornamental frame even when text wraps or zooms.
    const fit = () => {
      const inset = Math.max(letter.current.clientWidth * 0.3, copy.current.scrollHeight * 0.4);
      letter.current.style.setProperty('--letter-inset', `${Math.ceil(inset)}px`);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(copy.current);
    fit();
    const sheet = letter.current;
    const reveal = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        sheet.classList.add('letter-revealed');
        reveal.disconnect();
      }
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    reveal.observe(sheet);
    return () => { observer.disconnect(); reveal.disconnect(); };
  }, []);

  return <section id="origins" className="origins-letter-section" aria-labelledby="origins-title">
    <article ref={letter} className="origins-letter">
      <div ref={copy} className="origins-letter-copy">
        <span className="letter-chapter">Chapter I · The person behind the work</span>
        <h2 id="origins-title">Origins</h2>
        <p className="letter-lead">Every great creation begins with a restless mind.</p>
        <p className="letter-biography">{portfolio.bio}</p>
        <div className="letter-details">
          <div><GraduationCap size={23} /><span><b>{portfolio.role}</b><small>{portfolio.education}</small></span></div>
          <div><MapPin size={21} /><span>{portfolio.location}</span></div>
        </div>
        <div className="letter-interests">{portfolio.interests.map(item => <span key={item}>{item}</span>)}</div>
        <blockquote>“{portfolio.philosophy}”</blockquote>
        <a className="letter-link" href="#chronicles">Read the chronicles <MoveUpRight size={17} /></a>
      </div>
    </article>
  </section>;
}
