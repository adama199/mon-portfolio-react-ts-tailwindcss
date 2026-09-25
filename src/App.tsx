import { type FormEvent, useState } from 'react'
import './App.css'
import emailjs from '@emailjs/browser'

const navItems = [
  ["Accueil", "accueil"],
  ["À propos", "a-propos"],
  ["Compétences", "competences"],
  ["Expériences", "experiences"],
  ["Projets", "projets"],
  ["Services", "services"],
  ["Contact", "contact"],
];

const skills = [
  { title: "Frontend", icon: "</>", items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Tailwind CSS", "React Bootstrap", "Bootstrap"] },
  { title: "Backend & API", icon: "{ }", items: ["Laravel", "PHP", "REST API", "Axios"] },
  { title: "CMS", icon: "W", items: ["WordPress", "Elementor", "WooCommerce"] },
  { title: "Outils", icon: "⌘", items: ["Git", "GitHub", "VS Code", "Figma", "Responsive Design"] },
];

const projects = [
  { title: "Defaru", type: "React", label: "PLATEFORME D'APPRENTISSAGE", link: "https://defaru.sn/", description: "plateforme d'apprentissage en ligne 100% africaine.", stack: ["React", "CSS", "API REST"], tone: "df", mark: "DF" },
  { title: "EasyMarket", type: "React", label: "E-COMMERCE", link: "https://easymarket.sn/", description: "Marketplace complète pensée pour les commerçants locaux et l'achat mobile.", stack: ["React", "Bootstrap", "CSS"], tone: "em", mark: "EM" },
  { title: "EasyPM", type: "React", label: "PLATEFORME NUMÉRIQUE", link: "https://app.easypm.volkeno.com/", description: "Plateforme de dématérialisation de la gestion de l'IPM", stack: ["React", "Bootstrap", "SEO"], tone: "ipm", mark: "IPM" },
  { title: "EasyRH", type: "Laravel/React", label: "DASHBOARD", link: "https://easy-rh.net/", description: "Système d'Information de gestion des Ressources Humaines,", stack: ["React", "Recharts", "API REST", "Laravel"], tone: "rh", mark: "RH" },
  { title: "VolkenoSn", type: "Laravel", label: "PLATEFORME NUMÉRIQUE", link: "https://volkeno.com/", description: "Plateforme professionnelle d'une entreprise de services numériques.", stack: ["Laravel", "Bootstrap", "Figma"], tone: "vs", mark: "VS" },
  { title: "USSB", type: "Laravel/React", label: "SANTÉ", link: "https://ussbasso.org/", description: "Association engagés activement dans la lutte contre les Violences Gynécologiques et Obstétricales (VGO) en Afrique.", stack: ["Laravel", "React", "CSS3"], tone: "ussb", mark: "USSB" },
];

const services = [
  ["01", "Développement Frontend", "Des interfaces web modernes, responsives et performantes avec React.js et TypeScript.", "↗"],
  ["02", "Intégration Web", "Transformation de maquettes Figma en interfaces pixel-perfect, accessibles et soignées.", "⌁"],
  ["03", "Solutions WordPress", "Création, personnalisation et optimisation de sites professionnels simples à administrer.", "W"],
  ["04", "Applications web", "Des solutions complètes avec React.js, Laravel et des APIs REST robustes.", "{ }"],
];

const socialLinks = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Tous");
  const [sent, setSent] = useState(false);
  const visibleProjects = filter === "Tous" ? projects : projects.filter((project) => project.type === filter);

  // function submitForm(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setSent(true);
  //   event.currentTarget.reset();
  // }
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const submitForm = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSent(true);
    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        event.currentTarget,
        publicKey
      )

      alert('Message envoyé avec succès !')
    } catch (error) {
      console.error(error)
      alert("Une erreur est survenue.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#111b36]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="page flex h-20 items-center justify-between">
          <a href="#accueil" className="text-lg font-extrabold tracking-[-0.03em]">
            Adama<span className="text-[#635bff]">.</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="nav-link">{label}</a>
            ))}
          </nav>
          <a href="#contact" className="button-primary hidden sm:inline-flex">Parlons de votre projet <Arrow /></a>
          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <span className="space-y-1.5">
              <i className="block h-0.5 w-5 bg-slate-800" />
              <i className="block h-0.5 w-5 bg-slate-800" />
              <i className="block h-0.5 w-5 bg-slate-800" />
            </span>
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white px-6 py-5 lg:hidden">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="block border-b border-slate-100 py-3 text-sm font-semibold" onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <a href="#contact" className="floating-cta" aria-label="Me contacter">
        <span>Disponible</span><b>Parlons-nous</b><Arrow />
      </a>

      <main>
        <section id="accueil" className="hero-grid overflow-hidden pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="hero-word" aria-hidden="true">ADAMA</div>
          <div className="page grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div className="hero-copy">
              <div className="eyebrow"><span /> Disponible pour de nouveaux projets</div>
              <p className="mb-3 text-lg font-semibold text-[#635bff]">Bonjour, je suis Adama Diakhaté</p>
              <h1 className="max-w-3xl text-[3.15rem] font-extrabold leading-[.98] tracking-[-0.055em] text-[#0b1635] sm:text-6xl lg:text-[5.25rem]">
                Des interfaces qui donnent de <span className="gradient-text">l’élan</span> aux idées.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Développeuse Web Frontend, je conçois des interfaces modernes, performantes et responsives avec une expertise en React, intégration web et WordPress.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#projets" className="button-primary">Explorer mes projets <Arrow /></a>
                <a href="#contact" className="button-secondary">Me contacter</a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-[.14em] text-slate-400">
                  <span>Dakar</span><i className="h-px w-8 bg-slate-300" /><span>Remote friendly</span>
                </div>
                <div className="hero-socials">
                  <a href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="Profil GitHub">GH</a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Profil LinkedIn">in</a>
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="hero-orbit">
                <div className="orbit-label orbit-top">UI / UX</div>
                <div className="orbit-label orbit-bottom">BUILD · SHIP · IMPROVE</div>
                <div className="code-window">
                  <div className="code-top"><span /><span /><span /><b>portfolio.tsx</b></div>
                  <div className="code-body" aria-hidden="true">
                    <p><em>01</em><span className="pink">const</span> developer = {"{"}</p>
                    <p><em>02</em>&nbsp;&nbsp;name: <span className="green">&quot;Adama&quot;</span>,</p>
                    <p><em>03</em>&nbsp;&nbsp;role: <span className="green">&quot;Frontend Dev&quot;</span>,</p>
                    <p><em>04</em>&nbsp;&nbsp;experience: <span className="orange">&quot;4+ years&quot;</span>,</p>
                    <p><em>05</em>&nbsp;&nbsp;passion: <span className="green">&quot;build & create&quot;</span></p>
                    <p><em>06</em>{"};"}</p>
                    <p><em>07</em></p>
                    <p><em>08</em><span className="pink">export default</span> developer;</p>
                  </div>
                  <div className="code-status"><span>●</span> Ready to create <b>Ln 8, Col 26</b></div>
                </div>
                <div className="float-pill pill-react"><b>⚛</b><span>React<br /><small>Frontend</small></span></div>
                <div className="float-pill pill-wp"><b>W</b><span>WordPress<br /><small>CMS</small></span></div>
                <div className="float-pill pill-ts"><b>TS</b><span>TypeScript<br /><small>Development</small></span></div>
              </div>
            </div>
          </div>
          <div className="page mt-16">
            <div className="tech-console">
              <div className="tech-console-title"><span>STACK</span><b>Outils que j’utilise pour transformer les idées en produits.</b></div>
              <div className="tech-list">
                {["React.js", "TypeScript", "Laravel", "WordPress", "Tailwind CSS", "Figma"].map((tech, index) => (
                  <div key={tech}><small>0{index + 1}</small><span>{tech}</span><i /></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="a-propos" className="section bg-white">
          <div className="page grid items-center gap-14 lg:grid-cols-[.86fr_1.14fr]">
            <div className="about-art">
              <div className="about-lines" />
              <div className="about-initials">AD<span /></div>
              <div className="about-badge"><strong>4+</strong><span>années<br />d’expérience</span></div>
            </div>
            <div>
              <SectionTitle eyebrow="À propos" title={<>Le web, au service de <span>vos idées.</span></>} />
              <p className="mt-7 text-lg leading-8 text-slate-600">
                Développeuse web spécialisée dans la création d’interfaces modernes, responsives et accessibles. J’interviens sur des projets allant de sites vitrines et plateformes institutionnelles à des applications web et solutions e-commerce.
              </p>
              <p className="mt-4 leading-7 text-slate-500">
                Curieuse et rigoureuse, je combine sens du détail, compréhension des enjeux métier et maîtrise technique pour créer des expériences digitales utiles et durables.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {["Développement frontend", "Intégration web", "WordPress", "React.js", "Laravel", "Design responsive"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold"><i className="check">✓</i>{item}</div>
                ))}
              </div>
              <a href="assets/cv_adama_diakhate_developpeuse_frontend.pdf" download={'cv_adama_diakhate_developpeuse_frontend.pdf'} className="button-secondary mt-9">Télécharger mon CV <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section id="competences" className="section">
          <div className="page">
            <div className="max-w-2xl">
              <SectionTitle eyebrow="Mon expertise" title={<>Des compétences pour <span>donner vie</span> à vos projets.</>} />
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill) => (
                <article key={skill.title} className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.items.map((item) => <span key={item} className="tag">{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiences" className="section bg-[#0c1735] text-white">
          <div className="page grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="section-eyebrow text-[#8a85ff]">Mon parcours</p>
              <h2 className="section-title text-white section-title-white">Une expérience <span>construite</span> projet après projet.</h2>
              <p className="mt-6 max-w-md leading-7 text-slate-400">Plus de quatre années à imaginer, développer et faire évoluer des produits numériques exigeants.</p>
            </div>
            <div className="timeline">
              <Experience period="2024 — 2026" role="Développeuse Frontend confirmée" company="Volkeno · Dakar" description="Conception et développement d’interfaces web performantes. Collaboration avec les équipes produit pour livrer des solutions complètes et optimisées." tags={["React.js", "TypeScript", "Tailwind", "WordPress"]} />
              <Experience period="2021 — 2023" role="Développeuse Web Frontend" company="Volkeno · Dakar" description="Intégration de maquettes, développement de composants réutilisables. Mise en œuvre des bonnes pratiques d’intégration." tags={["JavaScript", "Bootstrap", "Laravel", "REST API", "Figma"]} />
              <Experience period="Avril 2020 — Décembre 2020" role="Intégratrice Web" company="Volkeno · Dakar" description="Création de sites vitrines et e-commerce responsives, maintenance et optimisation des performances." tags={["WordPress", "Bootstrap", "HTML5", "CSS3", "PHP", "sccs"]} />
            </div>
          </div>
        </section>

        <section id="projets" className="section bg-white">
          <div className="page">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl"><SectionTitle eyebrow="Projets sélectionnés" title={<>Des interfaces pensées pour être <span>utiles et mémorables.</span></>} /></div>
              <div className="filter-tabs" aria-label="Filtrer les projets">
                {["Tous", "React", "Laravel/React", "Laravel"].map((item) => (
                  <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
                ))}
              </div>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <article key={project.title} className="project-card">
                  <div className={`project-visual ${project.tone}`}>
                    <span className="mock-label">{project.label}</span>
                    <ProjectMockup mark={project.mark} variant={index % 3} />
                    <span className="project-index">0{index + 1}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#635bff]">{project.label}</p>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{project.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex gap-2">{project.stack.slice(0, 2).map((item) => <span className="mini-tag" key={item}>{item}</span>)}</div>
                      <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Voir le projet ${project.title}`} className="project-arrow"><Arrow /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="page">
            <div className="mx-auto max-w-2xl text-center"><SectionTitle eyebrow="Mes services" title={<>Ce que je peux faire <span>pour vous.</span></>} /></div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {services.map(([number, title, text, icon]) => (
                <article key={number} className="service-card">
                  <div className="service-icon">{icon}</div>
                  <div><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="page">
            <div className="process-card">
              <div><p className="section-eyebrow text-[#8a85ff]">Ma méthode</p><h2 className="text-3xl font-extrabold tracking-[-.04em] text-white">De l’idée à la mise en ligne.</h2></div>
              <div className="process-steps">
                {["Comprendre", "Concevoir", "Développer", "Tester", "Déployer"].map((item, index) => (
                  <div key={item}><span>0{index + 1}</span><b>{item}</b></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4">
          <div className="page cta-card">
            <div>
              <p className="text-sm font-bold text-violet-200">Une idée en tête ?</p>
              <h2>Vous avez un projet web ?</h2>
              <p>Discutons-en et construisons une solution qui vous ressemble.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="button-white">Me contacter <Arrow /></a>
              <a href="#projets" className="button-ghost">Voir mes projets</a>
            </div>
          </div>
        </section>

        <section id="contact" className="section bg-white">
          <div className="page grid gap-14 lg:grid-cols-[.82fr_1.18fr]">
            <div>
              <SectionTitle eyebrow="Contact" title={<>Travaillons <span>ensemble.</span></>} />
              <p className="mt-5 max-w-md leading-7 text-slate-500">Une mission, une opportunité ou simplement une idée à partager ? Je serais ravie d’échanger avec vous.</p>
              <div className="mt-9 space-y-4">
                <ContactLine label="Email" value="diakhateadama36@gmail.com" symbol="@" />
                <ContactLine label="Localisation" value="Dakar, Sénégal" symbol="⌖" />
                <div className="flex flex-wrap gap-3 pt-2">
                  <a className="social-button" href={socialLinks.linkedin} target="_blank" rel="noreferrer"><b>in</b> LinkedIn <Arrow /></a>
                  <a className="social-button" href={socialLinks.github} target="_blank" rel="noreferrer"><b>GH</b> GitHub <Arrow /></a>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitForm}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label>Votre nom<input required name="name" placeholder="Mamadou Diallo" /></label>
                <label>Votre email<input required type="email" name="email" placeholder="vous@email.com" /></label>
              </div>
              <label>Sujet<input required name="subject" placeholder="Parlons de votre projet" /></label>
              <label>Votre message<textarea required name="message" rows={5} placeholder="Décrivez-moi votre besoin..." /></label>
              <button className="button-primary justify-center cursor" type="submit">Envoyer le message <Arrow /></button>
              {sent && <p className="text-sm font-bold text-emerald-600" role="status">Merci ! Votre message a bien été envoyé.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#091329] py-10 text-white">
        <div className="page flex flex-col items-center justify-between gap-6 md:flex-row">
          <div><a href="#accueil" className="text-lg font-extrabold">Adama<span className="text-[#7c75ff]">.</span></a><p className="mt-1 text-xs text-slate-500">Développeuse Web Frontend</p></div>
          <div className="flex flex-wrap justify-center gap-5">{navItems.filter((_, i) => i !== 3).map(([label, id]) => <a className="text-xs font-semibold text-slate-400 hover:text-white" href={`#${id}`} key={id}>{label}</a>)}</div>
          <div className="flex items-center gap-4">
            <a className="footer-social" href={socialLinks.github} target="_blank" rel="noreferrer">GH</a>
            <a className="footer-social" href={socialLinks.linkedin} target="_blank" rel="noreferrer">in</a>
            <p className="text-xs text-slate-500">© 2026 Adama Diakhaté.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return <><p className="section-eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2></>;
}

function Experience({ period, role, company, description, tags }: { period: string; role: string; company: string; description: string; tags: string[] }) {
  return (
    <article className="timeline-item">
      <span className="timeline-dot" /><p className="text-xs font-bold uppercase tracking-[.14em] text-[#8a85ff]">{period}</p>
      <h3>{role}</h3><p className="company">{company}</p><p className="description">{description}</p>
      <div className="flex flex-wrap gap-2">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}

function ContactLine({ label, value, symbol }: { label: string; value: string; symbol: string }) {
  return <div className="contact-line"><i>{symbol}</i><div><span>{label}</span><b>{value}</b></div></div>;
}

function ProjectMockup({ mark, variant }: { mark: string; variant: number }) {
  return (
    <div className={`device-scene variant-${variant}`}>
      <div className="mock-browser">
        <div className="browser-bar"><i /><i /><i /><span>adama.dev/{mark.toLowerCase()}</span></div>
        <div className="browser-content">
          <aside><strong>{mark}</strong><i /><i /><i /><i /></aside>
          <main>
            <div className="mock-nav"><b>{mark}</b><span /><span /><span /></div>
            <div className="mock-hero"><div><small>UNE EXPÉRIENCE UNIQUE</small><strong>{mark === "PA" ? "Vos données, simplement." : "Conçu pour aller plus loin."}</strong><span /></div><i /></div>
            <div className="mock-widgets"><b /><b /><b /></div>
          </main>
        </div>
      </div>
      <div className="mock-phone"><i /><strong>{mark}</strong><span /><span /><b /></div>
    </div>
  );
}
