import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './projects-section.module.css';

function ProjectCard({ project, visible, index }) {
  const { title, problem, solution, impact, stack, demoUrl, repoUrl } = project;

  return (
    <article
      className={styles.card}
      data-visible={visible}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Heading className={styles.cardTitle} level={4} as="h3">
        {title}
      </Heading>
      <div className={styles.block}>
        <Text className={styles.label} size="s" as="p">
          Problem
        </Text>
        <Text size="m" as="p">
          {problem}
        </Text>
      </div>
      <div className={styles.block}>
        <Text className={styles.label} size="s" as="p">
          Solution
        </Text>
        <Text size="m" as="p">
          {solution}
        </Text>
      </div>
      <div className={styles.block}>
        <Text className={styles.label} size="s" as="p">
          Impact
        </Text>
        <Text size="m" as="p">
          {impact}
        </Text>
      </div>
      <div className={styles.block}>
        <Text className={styles.label} size="s" as="p">
          Tech stack
        </Text>
        <ul className={styles.stack}>
          {stack.map(t => (
            <li key={t}>
              <Text secondary size="s" as="span">
                {t}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.actions}>
        {demoUrl ? (
          <Button secondary iconHoverShift href={demoUrl} icon="chevron-right">
            Demo
          </Button>
        ) : null}
        {repoUrl ? (
          <Button secondary iconHoverShift href={repoUrl} icon="chevron-right">
            GitHub
          </Button>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectsSection({ id, visible, sectionRef }) {
  const { title, items } = portfolioContent.projects;
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
              <Heading className={styles.heading} level={3} id={titleId} data-visible={animVisible}>
                <DecoderText text={title} start={animVisible} delay={300} />
              </Heading>
            </div>
            <div className={styles.grid}>
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
