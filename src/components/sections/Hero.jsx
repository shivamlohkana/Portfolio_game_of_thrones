import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import AssetImage from '../ui/AssetImage';
import FireOverlay from '../effects/FireOverlay';

export default function Hero() {
  const [ready, setReady] = useState(false);
  return <section id="realm" className={`hero ${ready ? 'has-artwork' : ''}`} aria-labelledby="hero-title" style={{ '--hero-position': portfolio.hero.position, '--hero-mobile-position': portfolio.hero.mobilePosition }}>
    <div className="hero-art"><AssetImage src={portfolio.hero.src} alt="" priority onReady={() => setReady(true)} className="hero-image"><div className="hero-placeholder" aria-hidden="true"><div className="archive-frame frame-outer" /><div className="archive-frame frame-inner" /><span className="archive-monogram">{portfolio.initials}</span><span className="placeholder-annotation">THE ROYAL ARCHIVE <i /> ARTWORK FORTHCOMING</span></div></AssetImage><FireOverlay ready={ready} /></div>
    <div className="hero-vignette" aria-hidden="true" />
    <div className="hero-side-note" aria-hidden="true">ENGINEERING · CURIOSITY · CRAFT</div>
    <div className="hero-copy wrap"><div className="eyebrow"><i /> THE ARCHIVE OF <i /></div><h1 id="hero-title">{portfolio.name.split(' ')[0]}<br /><span>{portfolio.name.split(' ').slice(1).join(' ')}</span></h1><p className="hero-headline">{portfolio.headline}</p><p className="hero-tagline">{portfolio.tagline}</p><div className="hero-actions"><a className="button button-primary" href="#origins">Enter the Realm <ArrowRight size={17} /></a><a className="button button-quiet" href="#creations">View My Work <ArrowUpRight size={17} /></a></div></div>
    <div className="hero-bottom wrap"><span>AN ENGINEER’S JOURNEY<br /><b>WRITTEN IN CODE.</b></span><a className="scroll-cue" href="#origins"><span>SCROLL TO EXPLORE</span><ArrowDown size={18} /></a><span className="hero-volume">VOL. I <i /> THE BEGINNING</span></div>
  </section>;
}
