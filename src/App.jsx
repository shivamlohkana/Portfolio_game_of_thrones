import BackgroundMusic from './components/effects/BackgroundMusic';
import RavenFlight from './components/effects/RavenFlight';
import DragonFlyby from './components/effects/DragonFlyby';
import { useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Origins from './components/sections/Origins';
import SkillGrid from './components/sections/SkillGrid';
import Projects from './components/sections/Projects';
import { AchievementTimeline, ExperienceTimeline } from './components/sections/Timelines';
import BattleRecords from './components/sections/BattleRecords';
import Contact from './components/sections/Contact';
import Atmosphere from './components/effects/Atmosphere';
import Cursor from './components/effects/Cursor';
import useMotion from './hooks/useMotion';

export default function App() {
  const root = useRef(null);
  useMotion(root);
  return <div ref={root} className="site-root"><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><Hero /><div className="archive-divider"><span>THOUGHTFULLY BUILT</span><span className="diamond" /><span>CONTINUOUSLY REFINED</span></div><Origins /><SkillGrid /><Projects /><ExperienceTimeline /><AchievementTimeline /><BattleRecords /><Contact /></main><Footer /><Atmosphere /><RavenFlight /><DragonFlyby /><BackgroundMusic /><Cursor /></div>;
}
