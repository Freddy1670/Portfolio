'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Circle,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  Instagram,
  LockKeyhole,
  Mail,
  MessageCircle,
  Menu,
  Network,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

const trustedBrands = ['CHIVITA', 'BUYBETTER', 'DATAGUARD', 'ION CODEX', 'KUDDY COSMETICS', 'CONFIRMED OPTION', 'UNCENSORED WEARS', 'SKOTT COMMS', 'LACASERA'];

const metrics = [
  { value: '7+', label: 'Years in the IT industry' },
  { value: '20+', label: 'Commercial projects delivered' },
  { value: '20+', label: 'Clients served' },
  { value: '99.9%', label: 'Business system uptime' },
];

const expertise = [
  { number: '01', title: 'Software Engineering', icon: Code2, copy: 'Reliable systems, resilient APIs, and architecture built for the next order of magnitude.', items: ['Backend architecture', 'APIs & database design', 'System design', 'Performance optimization'] },
  { number: '02', title: 'Cybersecurity', icon: ShieldCheck, copy: 'Practical security programs that protect the systems people, teams, and customers rely on.', items: ['Security audits', 'Access control', 'Endpoint security', 'Risk management'] },
  { number: '03', title: 'Enterprise Technology', icon: ServerCog, copy: 'Connected operations that replace manual complexity with visibility, control, and momentum.', items: ['ERP systems', 'Odoo & Zoho', 'Inventory management', 'Business automation'] },
  { number: '04', title: 'E-Commerce Growth', icon: Globe2, copy: 'Digital commerce ecosystems designed to convert attention into enduring customer value.', items: ['WooCommerce & Shopify', 'Payment integrations', 'Conversion optimization', 'Customer experience'] },
  { number: '05', title: 'IT Leadership', icon: Network, copy: 'A clear operating model for the technology, vendors, and people behind ambitious businesses.', items: ['Team management', 'Infrastructure planning', 'Asset management', 'Enterprise operations'] },
];

const projects = [
  { index: '01', name: "Jenny's Glow Ghana", category: 'Commerce infrastructure', url: 'https://www.jennyscosmetics.com', description: 'A premium digital storefront and customer journey built to support a legacy beauty business entering its next chapter.', tags: ['E-commerce', 'Digital transformation'], visual: 'project-cosmetics' },
  { index: '02', name: 'Kuddy Cosmetics', category: 'E-commerce growth', url: 'http://kuddycosmetics.com', description: 'Leading the web and digital platform for a legacy beauty brand — driving e-commerce growth, systems optimization, and customer experience.', tags: ['E-commerce', 'Web management'], visual: 'project-kuddy' },
  { index: '03', name: 'BuyBetter Nigeria', category: 'Retail technology', url: 'https://buybetter.ng', description: 'An operational commerce platform connecting product discovery, inventory, and a frictionless path to purchase. ERP integration, infrastructure setup, and storefront maintenance.', tags: ['Systems optimization', 'ERP'], visual: 'project-buybetter' },
  { index: '04', name: 'Uncensored Wears', category: 'Brand systems', url: 'https://www.uncensoredwears.com', description: 'A distinct digital presence for a modern fashion label — leading design, website, and image projection.', tags: ['Commerce', 'Customer experience'], visual: 'project-wears' },
  { index: '05', name: 'Confirmed Option', category: 'Digital operations', url: 'https://confirmedoption.com', description: 'A platform designed around clarity, trust, and the operational detail that makes a digital business dependable.', tags: ['Platform design', 'Automation'], visual: 'project-confirmed' },
  { index: '06', name: 'Skott Communications', category: 'Business technology', url: 'https://skottcomms.com', description: 'Technology foundations that help a communications business stay sharp, discoverable, and ready to scale.', tags: ['Infrastructure', 'Web systems'], visual: 'project-skott' },
];

const timeline = [
  { year: 'Aug 2026 — Present', role: 'Web Manager', company: 'Kuddy Cosmetics', copy: 'Leading the web and digital platform for a legacy beauty brand — driving e-commerce growth, systems optimization, and customer experience.' },
  { year: 'Jan 2026 — Aug 2026', role: 'Creative Director', company: 'Uncensored Wears', copy: 'Led and created designs, website, and image projection for an independent fashion brand.' },
  { year: '2025', role: 'IT Support Officer → Junior IT Manager · Asset Manager', company: 'BuyBetter Nigeria', copy: 'Started as IT Support Officer, rose to Junior IT Manager. Led all IT operations and infrastructure alongside the IT Lead. Personally set up the Surulere branch, systems integration, and ERP. Maintained the storefront and website at 90% uptime. Also served as Asset Manager.' },
  { year: '2024', role: 'Web Developer & IT Support', company: 'Ion Codex', copy: 'Built and maintained more than 33 websites with an overall 97% uptime. Provided IT support and translated business needs into useful digital products.' },
  { year: '2023', role: 'IT Support · Data Entry', company: 'CHI Limited (Chivita / Hollandia) through DataGuard', copy: 'Entered the company through DataGuard in a data entry role, transitioning into IT support. Protecting information and supporting operations at enterprise scale.' },
  { year: '2022', role: 'IT Consultant · Junior IT Manager · Digital Marketing', company: 'Confirmed Option Integrated Services', copy: 'Provided IT consulting, junior IT management, digital marketing, and IT support for a high-trust digital business.' },
  { year: '2021', role: 'IT Support', company: 'Lacasera', copy: 'Foundational IT support experience in a fast-paced manufacturing environment.' },
];

const stack = [
  { label: 'Build', icon: Code2, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { label: 'Backend', icon: Database, items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'] },
  { label: 'Enterprise', icon: ServerCog, items: ['Odoo', 'Zoho', 'WooCommerce', 'Shopify'] },
  { label: 'Security', icon: LockKeyhole, items: ['Access control', 'Endpoint protection', 'Infrastructure security'] },
];

const certifications = ['Google IT Support', 'Google Cybersecurity', 'Google Digital Marketing', 'Project Management', 'AI for Business', 'NIIT Full Stack MMS'];

const collaborations = [
  { name: 'Dorman Long Engineering', url: 'https://www.dormanlongeng.com/', description: 'Digital infrastructure and web systems supporting a legacy engineering brand.', tags: ['Web systems', 'Infrastructure'], year: '2024' },
  { name: 'Lagos International Theatre Festival', url: 'https://app.lagosinternationaltheatrefestival.ng/public/programme/litf-2024', description: 'Platform development for a major cultural festival programme.', tags: ['Platform', 'Events'], year: '2024' },
  { name: 'Castles', url: 'https://castles.com.ng/', description: 'Technology collaboration on a real estate platform serving the Nigerian market.', tags: ['Collaboration', 'Real estate'], year: '2024' },
];

function MagneticButton({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'outline' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18 });
  const springY = useSpring(y, { stiffness: 280, damping: 18 });
  return (
    <motion.a
      href={href}
      className={`magnetic-button ${variant === 'outline' ? 'magnetic-button-outline' : ''}`}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * 0.14); y.set((event.clientY - rect.top - rect.height / 2) * 0.14); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >{children}</motion.a>
  );
}

function NetworkVisual() {
  const rings = Array.from({ length: 4 });
  const nodes = [
    { x: '16%', y: '28%', delay: 0 }, { x: '76%', y: '20%', delay: 0.7 }, { x: '82%', y: '69%', delay: 1.2 },
    { x: '25%', y: '77%', delay: 1.8 }, { x: '50%', y: '50%', delay: 0.3 }, { x: '90%', y: '43%', delay: 2.1 },
  ];
  return (
    <div className="network-visual" aria-hidden="true">
      <div className="network-grid" />
      {rings.map((_, index) => <div key={index} className="orbit" style={{ width: `${48 + index * 17}%`, height: `${48 + index * 17}%`, animationDelay: `${index * -1.6}s` }} />)}
      <div className="network-core"><div className="core-glow" /><span>FO</span></div>
      {nodes.map((node, index) => <motion.div key={index} className="network-node" style={{ left: node.x, top: node.y }} animate={{ scale: [1, 1.35, 1], opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.8, repeat: Infinity, delay: node.delay }} />)}
      <svg className="network-lines" viewBox="0 0 500 500" fill="none"><path d="M81 141L250 250L380 100M250 250L410 346M250 250L125 385M380 100L450 215" stroke="rgba(105,178,255,.38)" strokeWidth="1" strokeDasharray="5 8" /></svg>
      <div className="network-label label-a">SECURE / 01</div><div className="network-label label-b">SYSTEMS / 04</div><div className="network-label label-c">LAGOS · 06°31′N</div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({ project: '', email: '', details: '' });
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(30);
  const heroRef = useRef<HTMLElement>(null);

  const WHATSAPP_NUMBER = '2348166117943';

  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = `Hello Fredrick,%0A%0AI'd like to start a conversation.%0A%0A*Project:* ${encodeURIComponent(formData.project || 'Not specified')}%0A*Email:* ${encodeURIComponent(formData.email || 'Not specified')}%0A*Details:* ${encodeURIComponent(formData.details || 'Not specified')}%0A%0ASent from your portfolio website.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return (
    <main onMouseMove={(event) => { spotlightX.set((event.clientX / window.innerWidth) * 100); spotlightY.set((event.clientY / window.innerHeight) * 100); }}>
      <motion.div className="cursor-spotlight" style={{ left: useTransform(spotlightX, (value) => `${value}%`), top: useTransform(spotlightY, (value) => `${value}%`) }} />
      <header className="site-header"><a className="monogram" href="#top">FO<span>.</span></a><nav className={menuOpen ? 'nav-open' : ''}><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav><a href="#contact" className="header-cta">Start a project <ArrowUpRight size={14} /></a><button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>

      <section className="hero section-shell" ref={heroRef} id="top"><div className="hero-copy"><motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>Independent technology partner <span className="eyebrow-line" /></motion.div><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .15 }}>Building technology<br /><em>that moves business.</em></motion.h1><motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .4 }}>I design and engineer scalable software systems, secure infrastructures, and digital experiences that turn ambitious operations into durable growth.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .55 }}><MagneticButton href="#work">View selected work <ArrowDownRight size={16} /></MagneticButton><MagneticButton href="#contact" variant="outline">Let's build something <ArrowUpRight size={16} /></MagneticButton></motion.div><div className="hero-foot"><span><Circle size={8} fill="currentColor" /> Available for select engagements</span><span>Lagos, Nigeria · 06°31′N</span></div></div><motion.div className="hero-visual-wrap" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: .2 }}><NetworkVisual /></motion.div></section>

      <section className="trust-strip"><div className="section-shell trust-inner"><p>Trusted by leading brands<br />across Nigeria</p><div className="marquee-mask"><div className="marquee-track">{[...trustedBrands, ...trustedBrands].map((brand, index) => <span key={`${brand}-${index}`}><i />{brand}</span>)}</div></div></div></section>

      <section className="metrics section-shell"><div className="section-kicker">01 / The signal</div><div className="metrics-grid">{metrics.map((metric, index) => <motion.div className="metric" key={metric.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: index * .08 }}><strong>{metric.value}</strong><span>{metric.label}</span></motion.div>)}</div></section>

      <section className="intro section-shell" id="about"><div className="section-kicker">02 / The operator</div><div className="intro-grid"><h2>More than a<br /><span>developer.</span></h2><div className="intro-copy"><p className="large-copy">Fredrick Omoniyi is a Software Engineer, Technology Leader, and Statistician with over 7 years of experience specializing in backend systems, cybersecurity, enterprise infrastructure, ERP platforms, and e-commerce technology.</p><p>With a BSc in Statistics and deep expertise across software engineering and IT operations, he helps organizations modernize operations, secure digital assets, improve customer experiences, automate workflows, and scale revenue-generating platforms. He is also available for statistical work — data analysis, modelling, and insight — on the side.</p><a href="#contact" className="text-link">Read the approach <ArrowUpRight size={15} /></a></div></div></section>

      <section className="expertise section-shell" id="expertise"><div className="section-heading"><div><div className="section-kicker">03 / The capability</div><h2>Built for the<br /><span>complex part.</span></h2></div><p>Technology is rarely the constraint. Clarity, reliability, and the right operating system for the business are.</p></div><div className="expertise-grid">{expertise.map((item, index) => { const Icon = item.icon; return <motion.article className="expertise-card" key={item.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}><div className="card-top"><span>{item.number}</span><Icon size={21} strokeWidth={1.4} /></div><h3>{item.title}</h3><p>{item.copy}</p><ul>{item.items.map((entry) => <li key={entry}><Check size={13} />{entry}</li>)}</ul><div className="card-arrow"><ArrowUpRight size={17} /></div></motion.article>; })}</div></section>

      <section className="work section-shell" id="work"><div className="section-heading"><div><div className="section-kicker">04 / Selected work</div><h2>Systems that<br /><span>mean business.</span></h2></div><p>Every engagement starts with the operating reality, then builds the technology to meet it. No theatre. Just useful, durable work.</p></div><div className="project-list">{projects.map((project, index) => <motion.article className={`project-card ${project.visual}`} key={project.name} onMouseEnter={() => setActiveProject(index)} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="project-art"><div className="art-window"><div className="window-top"><span /><span /><span /><small>{project.name.toLowerCase().replaceAll(' ', '')}.com</small></div><div className="art-content"><div className="art-chip">{project.index} / 06</div><div className="art-bars"><i /><i /><i /></div><div className="art-line" /></div></div><span className="art-caption">{project.category}</span></div><div className="project-info"><div className="project-meta"><span>{project.index}</span><span>{project.category}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-bottom"><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}><ExternalLink size={17} /></a></div></div></motion.article>)}</div><div className="work-progress"><span>0{activeProject + 1}</span><div><i style={{ width: `${((activeProject + 1) / projects.length) * 100}%` }} /></div><span>0{projects.length}</span></div></section>

      <section className="role section-shell"><div className="role-orb" /><div className="section-kicker">05 / Current featured role</div><div className="role-grid"><div><p className="role-label">Web Manager · August 2026 — Present</p><h2>Kuddy<br /><em>Cosmetics.</em></h2><p className="role-intro">Leading the web and digital platform for a legacy beauty brand — driving e-commerce growth, systems optimization, and customer experience.</p><a href="http://kuddycosmetics.com" target="_blank" rel="noreferrer" className="text-link">Visit kuddycosmetics.com <ArrowUpRight size={15} /></a></div><div className="role-points">{['E-commerce growth', 'Systems optimization', 'Customer experience', 'Digital transformation', 'Technology leadership'].map((point, index) => <div key={point}><span>0{index + 1}</span><strong>{point}</strong><ArrowUpRight size={15} /></div>)}</div></div></section>

      <section className="collaborations section-shell"><div className="section-heading"><div><div className="section-kicker">06 / Collaborations</div><h2>Selected<br /><span>collaborations.</span></h2></div><p>Projects built in collaboration with teams and organizations across engineering, culture, and real estate.</p></div><div className="collab-grid">{collaborations.map((item, index) => <motion.article className="collab-card" key={item.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><div className="collab-top"><Users size={20} strokeWidth={1.4} /><span>{item.year}</span></div><h3>{item.name}</h3><p>{item.description}</p><div className="collab-bottom"><div className="collab-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.name}`}><ExternalLink size={17} /></a></div></motion.article>)}</div></section>

      <section className="timeline section-shell"><div className="section-kicker">07 / The trajectory</div><div className="section-heading timeline-heading"><h2>Experience with<br /><span>operational weight.</span></h2><p>From data integrity to infrastructure leadership, the throughline is simple: make the system work better than it did yesterday.</p></div><div className="timeline-list">{timeline.map((entry, index) => <motion.div className="timeline-entry" key={`${entry.year}-${entry.company}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><div className="timeline-year">{entry.year}</div><div className="timeline-dot"><span /></div><div className="timeline-detail"><h3>{entry.role}</h3><p className="timeline-company">{entry.company}</p><p>{entry.copy}</p></div></motion.div>)}</div></section>

      <section className="stack section-shell"><div className="section-kicker">08 / The toolkit</div><div className="stack-grid"><div><h2>Serious tools for<br /><span>serious systems.</span></h2><p>The stack flexes to the business. The standards do not.</p></div><div className="stack-cards">{stack.map((group) => { const Icon = group.icon; return <div className="stack-card" key={group.label}><Icon size={20} /><h3>{group.label}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>; })}</div></div></section>

      <section className="certs section-shell"><div className="section-kicker">09 / Continuous learning</div><div className="certs-top"><h2>Always sharpening<br /><span>the edge.</span></h2><p>Credentials matter less than capability. Still, the learning never stops.</p></div><div className="certs-list">{certifications.map((cert, index) => <div className="cert-badge" key={cert}><span>0{index + 1}</span><Sparkles size={16} /><strong>{cert}</strong><ArrowUpRight size={14} /></div>)}</div></section>

      <section className="contact section-shell" id="contact"><div className="contact-glow" /><div className="section-kicker">10 / Make an enquiry</div><div className="contact-grid"><div><h2>Let&apos;s build technology that <em>moves business forward.</em></h2><p>Whether you&apos;re launching a SaaS platform, scaling an e-commerce operation, modernizing infrastructure, securing enterprise systems, or need statistical work — let&apos;s create something exceptional.</p><div className="contact-links"><a href="mailto:Fredomoniyi6@gmail.com">Email <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/fredrick-omoniyi-1b1468273/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href="https://www.instagram.com/rickmayore_?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15} /></a><a href="https://wa.me/2348166117943" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a></div></div><form className="contact-form" onSubmit={handleContactSubmit}><label>What are you building? <input type="text" placeholder="A new digital operation" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} /></label><label>Your email <input type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></label><label>Tell me a little more <textarea placeholder="The context, the ambition, the constraint..." rows={3} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} /></label><button type="submit" className="submit-button">Start the conversation on WhatsApp <ArrowUpRight size={17} /></button></form></div></section>

      <footer className="footer section-shell"><a className="monogram" href="#top">FO<span>.</span></a><p>Software engineer · backend architect · technology leader · statistician</p><span>© {new Date().getFullYear()} Fredrick Omoniyi</span></footer>

      <div className={`floating-contact ${chatOpen ? 'is-open' : ''}`}>
        <motion.div className="contact-panel" initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: chatOpen ? 1 : 0, scale: chatOpen ? 1 : 0.85, y: chatOpen ? 0 : 10 }} transition={{ duration: 0.25, ease: 'easeOut' }} style={{ pointerEvents: chatOpen ? 'auto' : 'none' }}>
          <div className="contact-panel-header">
            <span>Let&apos;s talk</span>
            <button onClick={() => setChatOpen(false)} aria-label="Close"><X size={16} /></button>
          </div>
          <p className="contact-panel-sub">Reach out directly — I usually respond within the hour.</p>
          <a className="contact-option" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Fredrick, I found your portfolio and would like to discuss a project.')}`} target="_blank" rel="noreferrer">
            <span className="contact-option-icon whatsapp-icon"><MessageCircle size={18} /></span>
            <span className="contact-option-text"><strong>WhatsApp</strong><small>Fastest response</small></span>
            <ArrowUpRight size={16} />
          </a>
          <a className="contact-option" href="mailto:Fredomoniyi6@gmail.com">
            <span className="contact-option-icon email-icon"><Mail size={18} /></span>
            <span className="contact-option-text"><strong>Email</strong><small>Fredomoniyi6@gmail.com</small></span>
            <ArrowUpRight size={16} />
          </a>
          <a className="contact-option" href="https://www.linkedin.com/in/fredrick-omoniyi-1b1468273/" target="_blank" rel="noreferrer">
            <span className="contact-option-icon linkedin-icon"><Users size={18} /></span>
            <span className="contact-option-text"><strong>LinkedIn</strong><small>Connect professionally</small></span>
            <ArrowUpRight size={16} />
          </a>
          <a className="contact-option" href="https://www.instagram.com/rickmayore_?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">
            <span className="contact-option-icon instagram-icon"><Instagram size={18} /></span>
            <span className="contact-option-text"><strong>Instagram</strong><small>@rickmayore_</small></span>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <motion.button className="floating-contact-btn" onClick={() => setChatOpen((open) => !open)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} aria-label="Open contact options">
          <motion.span animate={{ rotate: chatOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>{chatOpen ? <X size={24} /> : <MessageCircle size={24} />}</motion.span>
          {!chatOpen && <span className="floating-pulse" />}
        </motion.button>
      </div>
    </main>
  );
}
