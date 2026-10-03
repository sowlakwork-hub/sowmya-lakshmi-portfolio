import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import './styles.css';

const nav = ['home', 'about', 'skills', 'projects', 'education', 'experience', 'certificates', 'achievements', 'contact'];
const greetings = ['வணக்கம்', 'Hello', 'नमस्ते', 'నమస్తే', 'ನಮಸ್ಕಾರ', 'നമസ്കാരം', 'こんにちは', 'Hola'];

const certificates = [
  { id:'iitm-qualifier', title:'IIT Madras — Foundation Qualifier & Admission', group:'IIT Madras', date:'Foundation-level qualifier', image:'/proofs/p09-iitm-qualifier.png', pdf:'/proofs/p09-iitm-qualifier.pdf' },
  { id:'iitm-badges', title:'IIT Madras — Academic Progress Badges', group:'IIT Madras', date:'Academic progress record', image:'/proofs/p11-iitm-badges.png', pdf:'/proofs/p11-iitm-badges.pdf' },
  { id:'iitm-id', title:'IIT Madras — Foundation Level Student ID', group:'IIT Madras', date:'Student ID / supporting proof', image:'/proofs/p08-iitm-id.png', pdf:'/proofs/p08-iitm-id.pdf' },
  { id:'fls', title:'FLSmidth Internship & Project Certificate', group:'Internship', date:'4 Aug 2025 – 31 Oct 2025', image:'/proofs/p19-flsmidth.png', pdf:'/proofs/p19-flsmidth.pdf' },
  { id:'immersive', title:'Immersive Technology Workshop', group:'Workshops', date:'Certificate of participation', image:'/proofs/p05-immersive-tech.png', pdf:'/proofs/p05-immersive-tech.pdf' },
  { id:'python-ai', title:'AI for Techies — Python Using AI Workshop', group:'Workshops', date:'Issued 8 Mar 2026', image:'/proofs/p18-python-ai.png', pdf:'/proofs/p18-python-ai.pdf' },
  { id:'be10x', title:'AI Tools & Claude Workshop', group:'Workshops', date:'Issued 1 Oct 2026', image:'/proofs/p20-be10x.png', pdf:'/proofs/p20-be10x.pdf' },
  { id:'throwball', title:'Throwball — Certificate of Merit', group:'Achievements', date:'Annual Sports Meet 2021–2022', image:'/proofs/p03-throwball.png', pdf:'/proofs/p03-throwball.pdf' },
  { id:'wall', title:'Wall Painting — Certificate of Merit', group:'Achievements', date:'Annual event 2021–2022', image:'/proofs/p04-wall-painting.png', pdf:'/proofs/p04-wall-painting.pdf' },
  { id:'volleyball', title:'Volleyball — Certificate of Merit', group:'Achievements', date:'Annual Sports Meet 2022–2023', image:'/proofs/p06-volleyball.png', pdf:'/proofs/p06-volleyball.pdf' },
  { id:'imctf', title:'IMCTF — Bharateeya Samskara Gaanam Appreciation', group:'Achievements', date:'24 Jan 2020', image:'/proofs/p07-imctf.png', pdf:'/proofs/p07-imctf.pdf' },
];

const skills = [
  ['Python','Programming'], ['Java','Programming'], ['SQL','Data'], ['Power BI','Analytics'],
  ['GPT / AI Tools','AI'], ['Prompt-based Development','AI'], ['Statistics','Data'], ['DBMS','Data'], ['Cloud Computing Fundamentals','Cloud'],
];

const projects = [
  { title:'Policy AI Chatbot', subtitle:'Semantic Search Engine', body:'Semantic-search chatbot for policy documents using Python and Streamlit.', stack:['Python','Streamlit','Semantic Search'] },
  { title:'Web Projects', subtitle:'LIC · Reminder · Fitness', body:'LIC Website, Reminder Web App and Fitness Chatbot.', stack:['Web','Chatbot','AI Tools'] },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
}

function Intro({ onDone }: { onDone:()=>void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setI(v => v + 1), 360);
    const timeout = window.setTimeout(onDone, 3200);
    return () => { window.clearInterval(interval); window.clearTimeout(timeout); };
  }, [onDone]);
  return (
    <div className="intro-screen">
      <div className="intro-stars" />
      <div className="intro-center">
        <div className="intro-greeting">{greetings[i % greetings.length]}</div>
        <div className="intro-rule" />
        <div className="intro-name">Sowmya Lakshmi B</div>
        <div className="intro-meta">Welcome</div>
      </div>
    </div>
  );
}

function SolarSystemCanvas({ runKey }: { runKey:number }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    camera.position.set(0, 1.5, 15);

    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x080916, 1.45);
    scene.add(hemi);
    const sunLight = new THREE.PointLight(0xffd49a, 85, 40, 1.6);
    sunLight.position.set(0, 0.8, 0);
    scene.add(sunLight);

    const root = new THREE.Group();
    root.rotation.z = -0.08;
    scene.add(root);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 48, 48),
      new THREE.MeshBasicMaterial({ color:0xffc85e })
    );
    root.add(sun);
    const sunGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 32, 32),
      new THREE.MeshBasicMaterial({ color:0xffa83d, transparent:true, opacity:.09, side:THREE.BackSide })
    );
    root.add(sunGlow);

    const planets = [
      { r:2.5, size:.17, color:0xaeb5c8, speed:.72, tilt:.15 },
      { r:3.35, size:.25, color:0xe7a85d, speed:.45, tilt:-.12 },
      { r:4.35, size:.31, color:0x5e86d8, speed:.34, tilt:.2 },
      { r:5.4, size:.22, color:0xb35a42, speed:.25, tilt:-.17 },
      { r:6.7, size:.64, color:0xcaa474, speed:.12, tilt:.1 },
      { r:8.0, size:.52, color:0x9ca4c2, speed:.085, tilt:-.2 },
    ];
    const orbits: THREE.Mesh[] = [];
    const planetMeshes: {mesh:THREE.Mesh; def:(typeof planets)[number]; phase:number}[] = [];
    planets.forEach((def, idx) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(def.r, def.r + .006, 140),
        new THREE.MeshBasicMaterial({ color: idx % 2 === 0 ? 0xf2d58c : 0x7e87a7, transparent:true, opacity:.22, side:THREE.DoubleSide })
      );
      ring.rotation.x = Math.PI / 2.18 + def.tilt;
      root.add(ring); orbits.push(ring);

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(def.size, 24, 24),
        new THREE.MeshStandardMaterial({ color:def.color, roughness:.84, metalness:.06 })
      );
      root.add(mesh);
      planetMeshes.push({ mesh, def, phase:idx * .78 });

      if (idx === 4 || idx === 5) {
        const sr = def.size * 1.7;
        const saturnRing = new THREE.Mesh(
          new THREE.RingGeometry(sr, sr + .07, 64),
          new THREE.MeshBasicMaterial({ color:0xd8c7a0, transparent:true, opacity:.38, side:THREE.DoubleSide })
        );
        saturnRing.rotation.x = Math.PI / 2.45;
        mesh.add(saturnRing);
      }
    });

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(.07, 16, 16),
      new THREE.MeshStandardMaterial({ color:0xd6d7db, roughness:1 })
    );
    root.add(moon);

    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1200 * 3);
    for (let i=0;i<1200;i++) {
      positions[i*3] = (Math.random()-.5)*42;
      positions[i*3+1] = (Math.random()-.5)*24;
      positions[i*3+2] = (Math.random()-.5)*14 - 2;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color:0xe9e5ff, size:.025, transparent:true, opacity:.72 }));
    scene.add(stars);

    let pointerX = 0, pointerY = 0;
    const onPointer = (e:PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointerX = (e.clientX-r.left)/r.width-.5;
      pointerY = (e.clientY-r.top)/r.height-.5;
    };
    mount.addEventListener('pointermove', onPointer);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now() + runKey * 35;
    let raf = 0;
    const tick = (now:number) => {
      const sec = (now-start)/1000;
      sun.rotation.y = sec*.08;
      sunGlow.scale.setScalar(1 + Math.sin(sec*.8)*.02);
      root.rotation.y += (((pointerX*.08) - root.rotation.y) * .014);
      root.rotation.x += (((-pointerY*.05) - root.rotation.x) * .014);
      planetMeshes.forEach(({mesh, def, phase}) => {
        const a = sec*def.speed + phase;
        mesh.position.set(Math.cos(a)*def.r, Math.sin(a*.7)*.23, Math.sin(a)*def.r*.66);
        mesh.rotation.y += .004;
      });
      const earth = planetMeshes[2]?.mesh;
      if (earth) {
        const a = sec*planets[2].speed + planetMeshes[2].phase;
        moon.position.set(Math.cos(a + sec*.85)*planets[2].r + Math.cos(sec*1.4)*.54, Math.sin(sec*1.4)*.16, Math.sin(a + sec*.85)*planets[2].r*.66 + Math.sin(sec*1.4)*.54);
      }
      stars.rotation.y = sec*.003;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      starGeometry.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [runKey]);
  return <div className="solar-canvas" ref={mountRef} aria-hidden="true" />;
}

function SolarBackdrop({ runKey }: { runKey:number }) {
  return (
    <div className="solar-backdrop" aria-hidden="true">
      <SolarSystemCanvas runKey={runKey}/>
      <div className="nebula nebula-a"/><div className="nebula nebula-b"/>
      <div className="star-dust"/>
    </div>
  );
}

function SectionHeading({ number, label, title, accent, description }:{number:string;label:string;title:string;accent:string;description:string}) {
  return (
    <div className="section-heading">
      <div className="heading-number">{number}</div>
      <div><small>{label}</small><h2>{title} <em>{accent}</em></h2></div>
      <p>{description}</p>
    </div>
  );
}

function CertificateModal({ item, onClose }:{item:any;onClose:()=>void}) {
  return (
    <div className="modal-backdrop" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="certificate-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close certificate">×</button>
        <div className="certificate-modal-top">
          <div><small>{item.group}</small><h2>{item.title}</h2><p>{item.date}</p></div>
          <a href={item.pdf} target="_blank" rel="noreferrer">Open PDF ↗</a>
        </div>
        <div className="certificate-proof"><img src={item.image} alt={item.title}/></div>
      </div>
    </div>
  );
}

function useMagicSections(intro:boolean) {
  useEffect(() => {
    const els = document.querySelectorAll('.magic-section');
    const obs = new IntersectionObserver(entries => entries.forEach(e=>e.target.classList.toggle('magic-in', e.isIntersecting)), { threshold:.2 });
    els.forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  }, [intro]);
}

function App() {
  const [intro,setIntro] = useState(true);
  const [dark,setDark] = useState(true);
  const [runKey,setRunKey] = useState(1);
  const [cert,setCert] = useState<any|null>(null);
  const [certGroup,setCertGroup] = useState('All');
  const [active,setActive] = useState('home');

  useEffect(()=>{ document.documentElement.dataset.theme = dark ? 'dark' : 'light'; },[dark]);
  useMagicSections(intro);

  useEffect(()=>{
    const obs = new IntersectionObserver(entries => entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id); }), { rootMargin:'-38% 0px -52%' });
    nav.forEach(id=>{ const el=document.getElementById(id); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  },[intro]);

  useEffect(()=>{
    const hero=document.getElementById('home'); if(!hero) return;
    let left=false;
    const obs=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting) left=true;
      if(entry.isIntersecting && left){ setRunKey(v=>v+1); left=false; }
    },{threshold:.6});
    obs.observe(hero); return ()=>obs.disconnect();
  },[]);

  const groups=['All','IIT Madras','Internship','Workshops','Achievements'];
  const shownCerts=useMemo(()=>certGroup==='All'?certificates:certificates.filter(c=>c.group===certGroup),[certGroup]);

  return (
    <div className="app-shell">
      {intro && <Intro onDone={()=>setIntro(false)}/>} 
      <SolarBackdrop runKey={runKey}/>

      <header className="site-nav">
        <a className="logo" href="#home">SL<span>✦</span></a>
        <nav aria-label="Primary navigation">{nav.map(id=><a className={active===id?'active':''} href={'#'+id} key={id}>{id[0].toUpperCase()+id.slice(1)}</a>)}</nav>
        <div className="nav-actions">
          <button onClick={()=>setDark(v=>!v)} aria-label="Toggle day and dark mode">{dark?'☀':'☾'}</button>
          <button onClick={()=>{setIntro(true);setRunKey(v=>v+1)}}>Replay</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section magic-section">
          <div className="hero-moon-scene" aria-hidden="true"><div className="hero-moon"/><div className="moonlight-beam"/></div>
          <div className="hero-overlay"/>
          <div className="hero-content">
            <div className="hero-side hero-side-left">
              <p className="eyebrow">PORTFOLIO · CHENNAI</p>
              <h1>Hi, I’m <span>Sowmya Lakshmi B</span></h1>
              <p className="hero-line">B.Tech Information Technology · CGPA 8.20</p>
              <p>Prince Shri Venkateshwara Padmavathy Engineering College · 2023–2027</p>
              <div className="hero-actions"><button onClick={()=>scrollTo('projects')}>Explore My Work</button><a href="#certificates">View Certificates</a></div>
            </div>

            <div className="hero-portrait">
              <div className="portrait-orbit orbit-a"/><div className="portrait-orbit orbit-b"/><div className="portrait-orbit orbit-c"/>
              <div className="portrait-frame"><img src="/sowmya.jpg" alt="Sowmya Lakshmi B"/></div>
              <div className="portrait-moonlight" aria-hidden="true"/>
              <div className="portrait-marker marker-one">B.TECH IT</div>
              <div className="portrait-marker marker-two">IIT MADRAS</div>
              <div className="portrait-marker marker-three">CGPA 8.20</div>
            </div>

            <div className="hero-side hero-side-right">
              <div className="hero-fact"><span>EDUCATION</span><strong>BS in Data Science and Applications</strong><small>Indian Institute of Technology Madras · Pursuing</small></div>
              <div className="hero-fact"><span>EXPERIENCE</span><strong>FLSmidth Internship</strong><small>Global Business Services / IT Business Applications</small></div>
              <div className="hero-fact"><span>FOCUS</span><strong>Python · Java · SQL · Power BI</strong><small>Statistics · DBMS · Cloud Computing Fundamentals</small></div>
            </div>
          </div>
          <div className="scroll-cue">SCROLL TO TRAVEL THROUGH THE SYSTEM ↓</div>
        </section>

        <section id="about" className="content-section magic-section about-magic">
          <SectionHeading number="01" label="ABOUT" title="Two academic paths." accent="One practical portfolio." description="B.Tech Information Technology at PSVP Engineering College and BS in Data Science and Applications at IIT Madras." />
          <div className="about-constellation">
            <div className="constellation-line line-a"/><div className="constellation-line line-b"/><div className="constellation-line line-c"/>
            <div className="about-star star-a">IT</div><div className="about-star star-b">DS</div><div className="about-star star-c">WORK</div><div className="about-core">SOWMYA<br/><span>LAKSHMI B</span></div>
          </div>
          <div className="about-facts">
            <article><small>DEGREE 01</small><h3>B.Tech Information Technology</h3><p>Prince Shri Venkateshwara Padmavathy Engineering College · 2023–2027 · CGPA 8.20</p></article>
            <article><small>DEGREE 02</small><h3>BS Data Science and Applications</h3><p>Indian Institute of Technology Madras · Pursuing</p></article>
            <article><small>INDUSTRY</small><h3>FLSmidth Internship</h3><p>Global Business Services / IT Business Applications · 4 Aug 2025–31 Oct 2025</p></article>
          </div>
        </section>

        <section id="skills" className="content-section magic-section skills-section">
          <SectionHeading number="02" label="SKILLS" title="Skills move like" accent="orbiting satellites." description="Python, Java, SQL, Power BI, AI tools, Statistics, DBMS and Cloud Computing Fundamentals." />
          <div className="skill-system">
            <div className="skill-sun">SKILLS</div>
            {skills.map(([name,group],i)=><div className="skill-satellite" style={{'--i':i} as React.CSSProperties} key={name}><b>{name}</b><small>{group}</small></div>)}
          </div>
        </section>

        <section id="projects" className="content-section magic-section projects-section">
          <SectionHeading number="03" label="PROJECTS" title="Work that stays" accent="easy to scan." description="Two focused project areas with the real technologies named clearly." />
          <div className="project-system">
            <div className="project-core"><span>PROJECTS</span><small>OPEN A PLANET</small></div>
            <div className="project-grid">
              {projects.map((p,i)=><article className="project-card" key={p.title}>
                <div className="project-planet"><span>0{i+1}</span></div>
                <small>{p.subtitle}</small><h3>{p.title}</h3><p>{p.body}</p>
                <div className="stack-row">{p.stack.map(s=><span key={s}>{s}</span>)}</div>
                <button onClick={()=>scrollTo('contact')}>Project details →</button>
              </article>)}
            </div>
          </div>
        </section>

        <section id="education" className="content-section magic-section education-section">
          <SectionHeading number="04" label="EDUCATION" title="Two degrees enter from" accent="opposite sides." description="The two degree paths stay together visually, without repeating the same qualification elsewhere." />
          <div className="education-stage">
            <div className="education-axis"/>
            <article className="edu-card edu-left"><span className="edu-badge">B.TECH IT</span><h3>Prince Shri Venkateshwara Padmavathy Engineering College</h3><p>2023–2027</p><strong>CGPA 8.20</strong></article>
            <div className="education-sun"><span>EDUCATION</span></div>
            <article className="edu-card edu-right"><span className="edu-badge">BS DATA SCIENCE</span><h3>Indian Institute of Technology Madras</h3><p>Pursuing BS in Data Science and Applications</p><strong>IIT MADRAS</strong></article>
          </div>
        </section>

        <section id="experience" className="content-section magic-section experience-section">
          <SectionHeading number="05" label="EXPERIENCE" title="One real internship." accent="One clear trail." description="FLSmidth Private Limited · Global Business Services / IT Business Applications · 4 Aug 2025–31 Oct 2025." />
          <div className="experience-system">
            <div className="rocket">✦</div>
            <div className="experience-track"><span/><span/><span/></div>
            <article className="experience-card"><small>FLSMIDTH PRIVATE LIMITED</small><h3>Internship / Project</h3><p>Global Business Services / IT Business Applications.</p><button onClick={()=>setCert(certificates.find(c=>c.id==='fls'))}>Open internship certificate ↗</button></article>
          </div>
        </section>

        <section id="certificates" className="content-section magic-section certificates-section">
          <SectionHeading number="06" label="CERTIFICATES" title="Every proof can be" accent="opened." description="A dedicated archive using the actual supplied certificate pages. Click a card to view the proof." />
          <div className="cert-tabs">{groups.map(g=><button className={certGroup===g?'active':''} onClick={()=>setCertGroup(g)} key={g}>{g}</button>)}</div>
          <div className="certificate-grid">{shownCerts.map(c=><button className="certificate-card" onClick={()=>setCert(c)} key={c.id}><div className="cert-thumb"><img src={c.image} alt=""/><span>OPEN PROOF</span></div><div className="cert-copy"><small>{c.group}</small><h3>{c.title}</h3><p>{c.date}</p></div></button>)}</div>
        </section>

        <section id="achievements" className="content-section magic-section achievements-section">
          <SectionHeading number="07" label="ACHIEVEMENTS" title="Milestones crossing the" accent="sky." description="Patent, hackathon participation and recognized achievements from the supplied resume." />
          <div className="achievement-sky">
            <div className="meteor meteor-a"/><div className="meteor meteor-b"/><div className="meteor meteor-c"/>
            <div className="achievement-grid">
              <article><small>PATENT</small><h3>Obstacle-avoiding robotic system</h3><p>Patent granted.</p></article>
              <article><small>HACKATHON</small><h3>Smart India Hackathon</h3><p>College-level selection round.</p></article>
              <article><small>HACKATHON</small><h3>Cognizant Hackathon</h3><p>AI Agent project focused on Healthcare and Insurance.</p></article>
              <article><small>RECOGNITION</small><h3>Times Fresh Face</h3><p>Miss Unique.</p></article>
            </div>
          </div>
        </section>

        <section id="contact" className="content-section magic-section contact-section">
          <SectionHeading number="08" label="CONTACT" title="A calm place to" accent="land." description="Chennai, Tamil Nadu" />
          <div className="contact-system"><div className="signal-beacon"><span/><span/><span/></div><div className="contact-links"><a href="mailto:sowlakwork@gmail.com"><small>EMAIL</small><strong>sowlakwork@gmail.com</strong>↗</a><a href="https://github.com/sowlakwork-hub" target="_blank" rel="noreferrer"><small>GITHUB</small><strong>sowlakwork-hub</strong>↗</a><a href="https://www.linkedin.com/in/sowmya-lakshmi-b-245076365/" target="_blank" rel="noreferrer"><small>LINKEDIN</small><strong>sowmya-lakshmi-b</strong>↗</a></div></div>
        </section>
      </main>

      <footer>© Sowmya Lakshmi B · Solar-system portfolio interface</footer>
      {cert && <CertificateModal item={cert} onClose={()=>setCert(null)}/>} 
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App/>);
