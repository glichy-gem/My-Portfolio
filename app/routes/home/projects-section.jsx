import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './projects-section.module.css';

function impactLines(impact) {
  return impact
    .split('\n')
    .map(line => line.replace(/^•\s*/, '').trim())
    .filter(Boolean);
}

function ProjectCard({ project, visible, index }) {
  const { title, problem, solution, impact, stack, demoUrl, repoUrl } = project;

  return (
    <article
      className={styles.card}
      data-visible={visible}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.cardBar} />
      <div className={styles.columns}>
        <div className={styles.mainColumn}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Featured project
          </span>
          <Heading className={styles.cardTitle} level={3} as="h3">
            {title}
          </Heading>
          <div className={styles.block}>
            <span className={styles.label}>Problem</span>
            <Text as="p" className={styles.body}>
              {problem}
            </Text>
          </div>
          <div className={styles.block}>
            <span className={styles.label}>Solution</span>
            <Text as="p" className={styles.body}>
              {solution}
            </Text>
          </div>
        </div>
        <div className={styles.sideColumn}>
          <div className={styles.block}>
            <span className={styles.label}>Impact</span>
            <ul className={styles.impactList}>
              {impactLines(impact).map((line, i) => (
                <li key={i} className={styles.impactItem}>
                  <span className={styles.bulletMarker} aria-hidden="true">
                    ▸
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.block}>
            <span className={styles.label}>Tech stack</span>
            <div className={styles.stack}>
              {stack.map(tech => (
                <span key={tech} className={styles.stackChip}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.links}>
            {demoUrl ? (
              <a
                className={styles.projectLink}
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View demo</span>
                <span className={styles.arrow}>↗</span>
                <span className={styles.linkLine} />
              </a>
            ) : null}
            {repoUrl ? (
              <a
                className={styles.projectLink}
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View on GitHub</span>
                <span className={styles.arrow}>↗</span>
                <span className={styles.linkLine} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({ id, visible, sectionRef }) {
  const { title, subtitle, items } = portfolioContent.projects;
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.projects}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0}>
        {({ visible: animVisible, nodeRef }) => (
          <div className={styles.inner} ref={nodeRef}>
            <div className={styles.header}>
              <Divider
                className={styles.divider}
                notchWidth="64px"
                notchHeight="8px"
                collapsed={!animVisible}
                collapseDelay={400}
              />
              <div className={styles.headingRow}>
                <Heading className={styles.heading} level={3} id={titleId} data-visible={animVisible}>
                  <DecoderText text={title} start={animVisible} delay={300} />
                </Heading>
                {subtitle ? (
                  <Text as="p" className={styles.subtitle} data-visible={animVisible}>
                    {subtitle}
                  </Text>
                ) : null}
              </div>
            </div>
            <div className={styles.list}>
              {items.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  visible={animVisible}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
