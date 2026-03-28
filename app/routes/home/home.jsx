import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { useEffect, useRef, useState } from 'react';
import { portfolioContent } from './portfolio-content';
import { AboutSection } from './about-section';
import { CertificationsSection } from './certifications-section';
import { ContactSection } from './contact-section';
import { ExperienceSection } from './experience-section';
import { HeroSection } from './hero-section';
import { ProjectsSection } from './projects-section';
import { SkillsSection } from './skills-section';
import styles from './home.module.css';

export const links = () => {
  if (portfolioContent.hero.background !== 'displacementSphere') {
    return [];
  }
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  const { name, role } = portfolioContent.hero;
  return baseMeta({
    prefix: name,
    title: role,
    description: `Portfolio of ${name} — ${role}. Update copy in portfolio-content.js.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const hero = useRef();
  const about = useRef();
  const skills = useRef();
  const projects = useRef();
  const experience = useRef();
  const certifications = useRef();
  const contact = useRef();

  useEffect(() => {
    const sections = [
      hero,
      about,
      skills,
      projects,
      experience,
      certifications,
      contact,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section.current) sectionObserver.observe(section.current);
    });

    if (hero.current) indicatorObserver.observe(hero.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  const isVisible = ref =>
    ref.current ? visibleSections.includes(ref.current) : false;

  return (
    <div className={styles.home}>
      <HeroSection
        id="hero"
        sectionRef={hero}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <AboutSection
        id="about"
        sectionRef={about}
        visible={isVisible(about)}
      />
      <SkillsSection
        id="skills"
        sectionRef={skills}
        visible={isVisible(skills)}
      />
      <ProjectsSection
        id="projects"
        sectionRef={projects}
        visible={isVisible(projects)}
      />
      <ExperienceSection
        id="experience"
        sectionRef={experience}
        visible={isVisible(experience)}
      />
      <CertificationsSection
        id="certifications"
        sectionRef={certifications}
        visible={isVisible(certifications)}
      />
      <ContactSection
        id="contact"
        sectionRef={contact}
        visible={isVisible(contact)}
      />
      <Footer />
    </div>
  );
};
