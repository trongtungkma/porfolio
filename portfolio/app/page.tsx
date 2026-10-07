import DigitalTwinChat from './digital-twin-chat';
import { projects, skillGroups } from './portfolio-data';

const cvUrl = '/Le-Trong-Tung-Middle-FE.pdf';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner container">
          <a className="wordmark" href="#top" aria-label="Le Trong Tung, home">
            <span className="monogram" aria-hidden="true">lt.</span>
            <span>Lê Trọng Tùng<span className="wordmark-role">Frontend Developer</span></span>
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
            <p className="eyebrow">Frontend developer · Hanoi, Vietnam</p>
            <h1 id="intro-heading">Hi, I’m Tung.<br />I make complex<br />interfaces <em>feel simple.</em></h1>
            <p className="hero-description">I build web applications with Vue, Nuxt, and TypeScript. My work spans enterprise tools, healthcare, and the everyday systems people rely on.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href={cvUrl} download>Download CV <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">Building web products since 2019.</p>
          </div>
          <aside className="profile-card" aria-label="Professional background at a glance">
            <div className="profile-card-top"><span>A little about my work</span><span aria-hidden="true">01 /</span></div>
            <p className="profile-statement">Thoughtful interfaces.<br />Maintainable code.<br /><em>A willingness to learn.</em></p>
            <dl className="profile-facts">
              <div><dt>Primary focus</dt><dd>Frontend development</dd></div>
              <div><dt>Most recent role in my CV</dt><dd>CMC Global · Samsung SDS</dd></div>
              <div><dt>Collaboration</dt><dd>Vietnam, Japan &amp; Korea</dd></div>
            </dl>
            <a href="#digital-twin" className="profile-chat-link"><span>Curious about my background?<strong>Ask my Digital Twin</strong></span><span aria-hidden="true">↗</span></a>
          </aside>
        </section>
        <div className="technology-strip container" aria-label="Main technologies">
          <span>Tools I work with</span>
          <ul><li>Vue.js</li><li>TypeScript</li><li>React</li><li>Nuxt.js</li><li>NestJS</li><li>AWS</li></ul>
        </div>
        <section className="section about container" id="about" aria-labelledby="about-heading">
          <div className="section-heading"><p className="eyebrow">01 — About me</p><h2 id="about-heading">Good software starts<br />with understanding people.</h2></div>
          <div className="about-content prose">
            <p>I’m a frontend developer based in Hanoi. Since starting my career in 2019, I’ve worked on products ranging from warehouse systems and remote healthcare to monitoring and automation platforms.</p>
            <p>I enjoy turning requirements into clear interfaces and writing code that other developers can work with. At Mirabo and CMC Global, I’ve collaborated with designers, customers, and engineering teams in Vietnam, Japan, and Korea.</p>
            <p>I want to keep growing as a frontend developer, with a focus on clean code, maintainable applications, and learning from the people I work with.</p>
            <div className="personal-note"><span>Beyond the screen</span><p>Books, new technology, improving my English, and time for sports and esports.</p></div>
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
                  <div className="project-contribution"><h4>My contribution</h4><p>{project.contribution}</p></div>
                  <ul className="tags" aria-label={project.name + ' technologies'}>{project.stack.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  <div className="project-footer"><span>Frontend Developer</span><span>{project.team}-person team</span></div>
                </article>
              ))}
            </div>
            <p className="project-note">Project summaries are based on my CV. Public demos and detailed case studies will be added here when available.</p>
          </div>
        </section>
        <section className="experience section container" id="experience" aria-labelledby="experience-heading">
          <div className="section-heading"><p className="eyebrow">03 — Experience</p><h2 id="experience-heading">My career so far.</h2><p className="section-description">From client projects to enterprise development.</p></div>
          <div className="experience-list">
            <article className="experience-item">
              <div className="experience-date">Apr 2022 — Present<span>As listed in my CV</span></div>
              <div className="experience-body"><p className="company-name">CMC Global <span>· Samsung SDS projects</span></p><h3>Frontend Developer</h3><p>Building and maintaining features for Samsung projects using Vue.js alongside Java backend teams. Working with designers and customers in a structured delivery process.</p><ul className="tags"><li>Vue.js</li><li>Java integration</li><li>Customer collaboration</li></ul></div>
            </article>
            <article className="experience-item">
              <div className="experience-date">Mar 2019 — Apr 2022</div>
              <div className="experience-body"><p className="company-name">Mirabo JSC</p><h3>Frontend Developer</h3><p>Developed web applications for Japanese customers, including healthcare, education, staffing, and warehouse products. Worked with Vue, Nuxt, and TypeScript in Agile teams.</p><ul className="tags"><li>Vue.js &amp; Nuxt</li><li>TypeScript</li><li>Agile delivery</li></ul></div>
            </article>
          </div>
        </section>
        <section className="skills section container" id="skills" aria-labelledby="skills-heading">
          <div className="section-heading heading-row"><div><p className="eyebrow">04 — Skills &amp; learning</p><h2 id="skills-heading">A practical toolkit.</h2></div><p>Strongest in the frontend,<br />with experience across the stack.</p></div>
          <div className="skills-grid">
            {skillGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.description}</p><ul className="tags">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}
          </div>
          <div className="education-grid">
            <article><p className="eyebrow">Education · 2014–2019</p><h3>Information Security</h3><p>Academy of Cryptography Techniques</p></article>
            <article><p className="eyebrow">Certification · Earned 2022</p><h3>AWS Solutions Architect</h3><p>Associate certification</p></article>
            <article><p className="eyebrow">English · 2022</p><h3>TOEIC 650</h3><p>Continuing to improve my communication skills.</p></article>
          </div>
        </section>
        <DigitalTwinChat />
        <section className="contact section container" id="contact" aria-labelledby="contact-heading">
          <div><p className="eyebrow">06 — Get in touch</p><h2 id="contact-heading">Let’s talk about<br />your next project.</h2><p>For frontend opportunities or questions about my work,<br className="desktop-break" /> the best way to reach me is by email.</p><a className="contact-email" href="mailto:trongtung.kma@gmail.com">trongtung.kma@gmail.com <span aria-hidden="true">↗</span></a></div>
          <div className="contact-details"><div><span>Based in</span><p>Hanoi, Vietnam</p></div><div><span>Phone</span><a href="tel:+84377935698">+84 377 935 698</a></div><a className="text-link" href={cvUrl} download>Download my CV <span aria-hidden="true">↓</span></a></div>
        </section>
      </main>
      <footer className="site-footer container"><span>© {new Date().getFullYear()} Lê Trọng Tùng</span><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
