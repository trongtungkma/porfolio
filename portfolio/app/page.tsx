import DigitalTwinChat from './digital-twin-chat';
import { career, careerOverrides, cvUrl, projects } from './portfolio-data';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner container">
          <a className="wordmark" href="#top" aria-label="Le Trong Tung, home">
            <span className="monogram" aria-hidden="true">lt.</span>
            <span>{career.person.name}<span className="wordmark-role">{career.person.title}</span></span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#about">About</a><a href="#projects">Work</a><a href="#experience">Experience</a><a href="#digital-twin">Digital Twin</a>
          </nav>
          <a className="header-contact" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="intro-heading">
          <div className="hero-copy">
            <p className="eyebrow">{career.person.title} · {career.person.location}</p>
            <h1 id="intro-heading">Hi, I’m Tung.<br />I make complex<br />interfaces <em>feel simple.</em></h1>
            <p className="hero-description">{career.summary[0]}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href={cvUrl} download>Download CV <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">Building web products since {career.person.careerStarted}.</p>
          </div>
          <aside className="profile-card" aria-label="Professional background at a glance">
            <div className="profile-card-top"><span>A little about my work</span><span aria-hidden="true">01 /</span></div>
            <p className="profile-statement">Thoughtful interfaces.<br />Maintainable code.<br /><em>A willingness to learn.</em></p>
            <dl className="profile-facts">
              <div><dt>Primary focus</dt><dd>Frontend development</dd></div>
              <div><dt>Most recent role in my CV</dt><dd>{career.employment[0].company}{career.employment[0].client ? ` · ${career.employment[0].client}` : ''}</dd></div>
              <div><dt>Collaboration</dt><dd>Vietnam, Japan &amp; Korea</dd></div>
            </dl>
            <a href="#digital-twin" className="profile-chat-link"><span>Curious about my background?<strong>Ask my Digital Twin</strong></span><span aria-hidden="true">↗</span></a>
          </aside>
        </section>
        <div className="technology-strip container" aria-label="Main technologies">
          <span>Tools I work with</span>
          <ul>{careerOverrides.heroTechnologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </div>
        <section className="section about container" id="about" aria-labelledby="about-heading">
          <div className="section-heading"><p className="eyebrow">01 — About me</p><h2 id="about-heading">Good software starts<br />with understanding people.</h2></div>
          <div className="about-content prose">
            {career.summary.slice(0, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="personal-note"><span>Beyond the screen</span><p>{career.interests.join(', ')}.</p></div>
          </div>
        </section>
        <section className="projects section" id="projects" aria-labelledby="projects-heading">
          <div className="container">
            <div className="section-heading heading-row">
              <div><p className="eyebrow">02 — Selected work</p><h2 id="projects-heading">A few projects<br />I’ve contributed to.</h2></div>
              <p>Different products, different challenges.<br />Here’s where my experience comes from.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-meta"><span>{project.category}</span><span>{project.period}</span></div>
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-contribution"><h4>My contribution</h4><p>{project.highlights.join(' ')}</p></div>
                  <ul className="tags" aria-label={project.name + ' technologies'}>{project.technologies.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  <div className="project-footer"><span>{project.role}</span><span>{project.teamSize ? `${project.teamSize}-person team` : 'Team size not listed'}</span></div>
                </article>
              ))}
            </div>
            <p className="project-note">Project summaries are based on my CV. Public demos and detailed case studies will be added here when available.</p>
          </div>
        </section>
        <section className="experience section container" id="experience" aria-labelledby="experience-heading">
          <div className="section-heading"><p className="eyebrow">03 — Experience</p><h2 id="experience-heading">My career so far.</h2><p className="section-description">From client projects to enterprise development.</p></div>
          <div className="experience-list">
            {career.employment.map((job) => (
              <article className="experience-item" key={job.id}>
                <div className="experience-date">{job.period}{job.currentAsRecorded && <span>As listed in my CV</span>}</div>
                <div className="experience-body"><p className="company-name">{job.company} {job.client && <span>· {job.client}</span>}</p><h3>{job.role}</h3><p>{job.description}</p><ul className="tags">{job.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </section>
        <section className="skills section container" id="skills" aria-labelledby="skills-heading">
          <div className="section-heading heading-row"><div><p className="eyebrow">04 — Skills &amp; learning</p><h2 id="skills-heading">A practical toolkit.</h2></div><p>Strongest in the frontend,<br />with experience across the stack.</p></div>
          <div className="skills-grid">
            {career.skillGroups.map((group) => <article key={group.id}><h3>{group.title}</h3><p>{group.description}</p><ul className="tags">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}
          </div>
          <div className="education-grid">
            {career.education.map((item) => <article key={item.id}><p className="eyebrow">Education · {item.period}</p><h3>{item.program}</h3><p>{item.institution}</p></article>)}
            {career.certifications.map((item) => <article key={item.id}><p className="eyebrow">Certification · Earned {item.year}</p><h3>{item.name}</h3><p>{item.detail}</p></article>)}
            {career.languages.map((item) => <article key={item.id}><p className="eyebrow">English{item.year ? ` · ${item.year}` : ''}</p><h3>{item.name} {item.level}</h3><p>{item.note}</p></article>)}
          </div>
        </section>
        <DigitalTwinChat />
        <section className="contact section container" id="contact" aria-labelledby="contact-heading">
          <div><p className="eyebrow">06 — Get in touch</p><h2 id="contact-heading">Let’s talk about<br />your next project.</h2><p>For frontend opportunities or questions about my work,<br className="desktop-break" /> the best way to reach me is by email.</p><a className="contact-email" href={`mailto:${career.person.email}`}>{career.person.email} <span aria-hidden="true">↗</span></a></div>
          <div className="contact-details"><div><span>Based in</span><p>{career.person.location}</p></div><div><span>Phone</span><a href={`tel:${career.person.phone.replace(/[^\d+]/g, '')}`}>{career.person.phone}</a></div><a className="text-link" href={cvUrl} download>Download my CV <span aria-hidden="true">↓</span></a></div>
        </section>
      </main>
      <footer className="site-footer container"><span>© {new Date().getFullYear()} {career.person.name}</span><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
