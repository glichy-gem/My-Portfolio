import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { classes } from '~/utils/style';
import { portfolioContent } from './portfolio-content';
import styles from './projects-section.module.css';

function ProjectCard({ project, visible, index, featured }) {
  const { title, problem, solution, impact, stack, demoUrl, repoUrl } = project;

  return (
    <article
      className={classes(styles.card, featured && styles.cardFeatured)}
      data-featured={featured ? 'true' : undefined}
      data-visible={visible}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {featured ? (
        <Text className={styles.eyebrow} size="s" as="p">
          Featured project
        </Text>
      ) : null}
      <Heading className={styles.cardTitle} level={featured ? 3 : 4} as="h3">
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
        <Text className={styles.impactBody} size="m" as="p">
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
  const singleProject = items.length === 1;

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
            <div className={classes(styles.grid, singleProject && styles.gridSingle)}>
              {items.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  visible={animVisible}
                  index={index}
                  featured={singleProject}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
