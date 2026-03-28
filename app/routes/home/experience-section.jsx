import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './experience-section.module.css';

export function ExperienceSection({ id, visible, sectionRef }) {
  const { title, roles } = portfolioContent.experience;
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.experience}
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
            <ul className={styles.roles}>
              {roles.map((role, index) => (
                <li
                  key={`${role.company}-${role.title}`}
                  className={styles.role}
                  data-visible={animVisible}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className={styles.roleHeader}>
                    <Text size="l" as="h4" className={styles.roleTitle}>
                      {role.title}
                    </Text>
                    <Text secondary size="s" as="p" className={styles.meta}>
                      {role.company}
                      {role.period ? ` · ${role.period}` : ''}
                    </Text>
                  </div>
                  <ul className={styles.bullets}>
                    {role.contributions.map((line, i) => (
                      <li key={i}>
                        <Text secondary size="s" as="p" className={styles.bulletText}>
                          {line}
                        </Text>
                      </li>
                    ))}
                  </ul>
                  {role.techStack ? (
                    <Text secondary size="s" as="p" className={styles.techStackLine}>
                      <span className={styles.techStackLabel}>Tech Stack: </span>
                      {role.techStack}
                    </Text>
                  ) : null}
                  {role.impact ? (
                    <Text className={styles.impact} size="s" as="p">
                      {role.impact}
                    </Text>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Transition>
    </Section>
  );
}
