import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { portfolio } from '../../data/portfolio';

const links = [['realm', 'Realm'], ['origins', 'Origins'], ['creations', 'Creations'], ['victories', 'Victories'], ['skills', 'Skills']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('realm');
  const toggle = useRef(null);
  const navigation = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => [toggle.current, ...navigation.current.querySelectorAll('a')];
    const keydown = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current.focus(); }
      if (event.key === 'Tab') {
        const items = focusable(), first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const media = window.matchMedia('(min-width: 901px)');
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', keydown);
    media.addEventListener('change', resize);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', keydown); media.removeEventListener('change', resize); };
  }, [open]);
  return <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
    <a href="#realm" className="brand" aria-label={`${portfolio.name}, home`} onClick={() => setOpen(false)}><img className="brand-crest" src="/assets/branding/crest.png" alt="" width="56" height="50" /><span className="brand-wordmark">THE ROYAL ARCHIVE<span>EST. MMXXVI</span></span></a>
    <button ref={toggle} className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation">{open ? <X /> : <Menu />}</button>
    <nav ref={navigation} id="main-navigation" aria-label="Main navigation" className={open ? 'open' : ''}>
      {links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-contact" href="#ravens" data-raven-trigger onClick={() => setOpen(false)}>Ravens <ArrowUpRight size={14} /></a>
    </nav>
  </header>;
}
