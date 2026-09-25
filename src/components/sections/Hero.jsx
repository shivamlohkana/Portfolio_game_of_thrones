import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import AssetImage from '../ui/AssetImage';
import ScrollVideo from '../effects/ScrollVideo';

export default function Hero() {
  return <section id="realm" className="hero scroll-video-hero video-first-hero" aria-labelledby="hero-title">
    <h1 id="hero-title" className="sr-only">{portfolio.name} - {portfolio.headline}</h1>
    <div className="hero-art"><div className="hero-stage">
      <AssetImage src={portfolio.hero.src} alt="" priority className="hero-image" />
      <ScrollVideo />
    </div></div>
    <div className="hero-copy wrap">
      <div className="eyebrow"><i /> THE ARCHIVE OF</div>
      <h1>{portfolio.name.split(' ')[0]}<br /><span>{portfolio.name.split(' ').slice(1).join(' ')}</span></h1>
      <p className="hero-headline">{portfolio.headline}</p>
      <p className="hero-tagline">{portfolio.tagline}</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#origins">Enter the Realm <ArrowRight size={17} /></a>
        <a className="button button-quiet" href="#creations">View My Work <ArrowUpRight size={17} /></a>
      </div>
    </div>
    <a className="video-scroll-cue" href="#origins" aria-label="Skip video and explore Origins"><ArrowDown size={18} /><span>Scroll to explore</span></a>
  </section>;
}
