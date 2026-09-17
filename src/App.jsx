import { useState } from 'react'
import ParticlePortrait from './ParticlePortrait.jsx'
import RobotGame from './RobotGame.jsx'
import { profile, experience, projects } from './portfolioData.js'
import './App.css'

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'mail') return <svg {...common}><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg>
  if (name === 'github') return <svg {...common}><path d="M9 19c-4 1-4-2-6-2m12 4v-3.1a2.7 2.7 0 0 0-.7-2.1c2.5-.3 5.2-1.2 5.2-5.5a4.2 4.2 0 0 0-1.1-2.9 3.8 3.8 0 0 0-.1-2.9s-.9-.3-3 1.1a10.1 10.1 0 0 0-5.5 0C7.7 4.2 6.8 4.5 6.8 4.5a3.8 3.8 0 0 0-.1 2.9 4.2 4.2 0 0 0-1.1 2.9c0 4.3 2.7 5.2 5.2 5.5a2.7 2.7 0 0 0-.7 2.1V21"/></svg>
  if (name === 'linkedin') return <svg {...common}><path d="M4 9v11M4 5v.1M9 20v-11h4v1.7c.7-1.2 1.8-2 3.4-2 2.5 0 3.6 1.5 3.6 4.4V20h-4v-6.2c0-1.2-.3-1.9-1.4-1.9-1 0-1.6.7-1.6 1.9V20z"/></svg>
  if (name === 'devpost') return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z"/></svg>
  return <svg {...common}><path d="m4 20 4.5-1 11-11-3.5-3.5-11 11L4 20Z"/><path d="m14.5 6.5 3.5 3.5"/></svg>
}

function SectionHeading({ children }) { return <div className="section-heading"><h2>{children}</h2><span /></div> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [activeProject, setActiveProject] = useState(0)

  const navigation = [['Home', 'intro'], ['About', 'about'], ['Experience', 'experience'], ['Software', 'projects'], ['Hardware', 'hardware-projects'], ['Experiments', 'experiments']]
  const closeMenu = () => setMenuOpen(false)

  return <div className="app" id="top">
    <a className="skip-link" href="#intro">Skip to content</a>
    <header className="top-nav"><div className="top-nav-inner">
      <a className="brand" href="#intro" onClick={closeMenu}>{profile.name}</a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close ×' : 'Menu ☰'}</button>
      <nav id="primary-navigation" className={menuOpen ? 'primary-links open' : 'primary-links'} aria-label="Main navigation">{navigation.map(([label, id]) => <a href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>)}</nav>
      <div className="social-links">
        {profile.email && <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>}
        {profile.github && <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Icon name="github" /></a>}
        {profile.linkedin && <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Icon name="linkedin" /></a>}
      </div>
    </div></header>

    <RobotGame />
    <aside className="side-links" aria-label="Section shortcuts">{navigation.map(([, id]) => <a href={`#${id}`} key={id}><span>/</span>{id === 'intro' ? 'home' : id === 'projects' ? 'software' : id === 'hardware-projects' ? 'hardware' : id}</a>)}</aside>

    <main>
      <section id="intro" className="intro-section">
        <div className="portrait-wrap"><ParticlePortrait /></div>
        <div className="intro-block"><h1>hi, <span>{profile.firstName}</span> here.<b className="cursor">|</b></h1><p>{profile.intro}</p><a className="say-hi" href={`mailto:${profile.email}`}><Icon name="mail" /> Say hi!</a></div>
      </section>

      <section id="about" className="content-section about-section"><SectionHeading>/ about me</SectionHeading><div className="about-grid"><div><p>{profile.about}</p><p>Here are some technologies I have been working with:</p><ul className="tech-list">{profile.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><p>{profile.personal}</p></div><div className="about-portrait"><img src="/profile.jpg" alt="Josh Raja" /></div></div></section>

      <section id="experience" className="content-section experience-section"><SectionHeading>/ experience</SectionHeading><div className="experience-layout"><div className="experience-tabs" role="tablist" aria-label="Professional experience">{experience.map((job, index) => <button type="button" role="tab" key={job.label} aria-selected={activeTab === index} aria-controls="experience-panel" onClick={() => setActiveTab(index)}>{job.label}</button>)}</div><div id="experience-panel" className="experience-panel" role="tabpanel"><h3>{experience[activeTab].role} <span>@ {experience[activeTab].company}</span></h3><span>{experience[activeTab].period}</span><ul>{experience[activeTab].points.map(point => <li key={point}>{point}</li>)}</ul></div></div></section>

      <section id="projects" className="content-section software-section">
        <div className="section-with-link"><SectionHeading>/ software</SectionHeading><a href={profile.github} target="_blank" rel="noreferrer">View all projects →</a></div>
        <div className={`spotlight spotlight-${projects[activeProject].visual}`}>
          <div className="spotlight-art" aria-hidden="true"><div className="spotlight-window"><span>{projects[activeProject].title} / selected project</span><strong>{projects[activeProject].title}</strong><small>{projects[activeProject].stack}</small></div></div>
          <div className="spotlight-caption"><h3>{projects[activeProject].title.toLowerCase()}</h3><p>{projects[activeProject].description}</p><span>{projects[activeProject].stack}</span><div className="spotlight-links"><a href={projects[activeProject].github} target="_blank" rel="noreferrer" aria-label={`${projects[activeProject].title} source code`} title="GitHub"><Icon name="github" /></a>{projects[activeProject].devpost && <a href={projects[activeProject].devpost} target="_blank" rel="noreferrer" aria-label={`${projects[activeProject].title} on Devpost`} title="Devpost"><Icon name="devpost" /></a>}{projects[activeProject].demo && <a href={projects[activeProject].demo} target="_blank" rel="noreferrer">{projects[activeProject].demoLabel ?? 'Live app'} ↗</a>}</div></div>
          <button className="carousel-arrow previous" type="button" aria-label="Previous project" onClick={() => setActiveProject((activeProject - 1 + projects.length) % projects.length)}>‹</button>
          <button className="carousel-arrow next" type="button" aria-label="Next project" onClick={() => setActiveProject((activeProject + 1) % projects.length)}>›</button>
          <div className="carousel-dots" aria-label="Choose a featured project">{projects.map((item, index) => <button type="button" key={item.title} aria-label={`Show ${item.title}`} aria-current={activeProject === index ? 'true' : undefined} onClick={() => setActiveProject(index)} />)}</div>
        </div>
        <div className="project-grid">{projects.map(item => <article className="project-card" key={item.title}><div className="project-card-top"><span className="folder-symbol">▱</span><div className="project-card-links"><a href={item.github} target="_blank" rel="noreferrer" aria-label={`${item.title} source code`} title="GitHub"><Icon name="github" /></a>{item.devpost && <a href={item.devpost} target="_blank" rel="noreferrer" aria-label={`${item.title} on Devpost`} title="Devpost"><Icon name="devpost" /></a>}</div></div><h3>{item.title}</h3><p>{item.description}</p><span className="project-stack">{item.stack}</span>{item.demo && <a className="project-demo" href={item.demo} target="_blank" rel="noreferrer">{item.demoLabel ?? 'Live app'} ↗</a>}</article>)}</div>
      </section>

      <section id="hardware-projects" className="content-section hardware-section"><SectionHeading>/ hardware</SectionHeading><div className="placeholder-panel"><span className="placeholder-icon">⌁</span><div><h3>Polaris</h3><p>An autonomous fixed-wing aircraft platform with waypoint navigation, path planning, telemetry, sensor fusion, and simulation-based validation.</p><span>PYTHON · C++ · ROS 2 · MAVLINK</span></div></div></section>
      <section id="experiments" className="content-section art-section"><SectionHeading>/ experiments</SectionHeading><p className="art-intro">Ideas that started with a question and turned into working systems.</p><div className="experiment-grid"><article><span>01 / EVIDENCE SYSTEMS</span><h3>EchoTrace</h3><p>An evidence reconstruction engine for commercial fleet incidents, bringing fragmented media into a cited timeline.</p><a href="https://github.com/joshuaraja1/EchoTrace" target="_blank" rel="noreferrer">View project ↗</a></article><article><span>02 / SEMANTIC SEARCH</span><h3>CourseGPT</h3><p>A retrieval platform that makes more than 10K academic documents searchable through ingestion, embeddings, and grounded responses.</p></article></div></section>
    </main>
    <footer>Built and designed for {profile.name}.<br />Inspired by <a href="https://github.com/gazijarin/Gazi-V2" target="_blank" rel="noreferrer">Gazi V2</a>.</footer>
  </div>
}

export default App
