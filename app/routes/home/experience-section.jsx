import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './experience-section.module.css';

export function ExperienceSection({ id, visible, sectionRef }) {
  const { title, subtitle, roles } = portfolioContent.experience;
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
            <ul className={styles.roles}>
              {roles.map((role, index) => (
                <li
                  key={`${role.company}-${role.title}`}
                  className={styles.role}
                  data-visible={animVisible}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className={styles.timeline}>
                    <span className={styles.dot} data-current={index === 0} />
                    <span className={styles.line} />
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardBar} />
                    <div className={styles.roleHeader}>
                      <Heading className={styles.roleTitle} level={4} as="h4">
                        {role.title}
                      </Heading>
                      {role.period ? (
                        <span className={styles.periodPill}>{role.period}</span>
                      ) : null}
                    </div>
                    <Text secondary size="s" as="p" className={styles.meta}>
                      {role.company}
                      {role.location ? ` · ${role.location}` : ''}
                    </Text>
                    <ul className={styles.bullets}>
                      {role.contributions.map((line, i) => (
                        <li key={i} className={styles.bullet}>
                          <span className={styles.bulletMarker} aria-hidden="true">
                            ▸
                          </span>
                          <Text secondary size="s" as="span" className={styles.bulletText}>
                            {line}
                          </Text>
                        </li>
                      ))}
                    </ul>
                    {role.stack?.length ? (
                      <div className={styles.stack}>
                        {role.stack.map(tech => (
                          <span key={tech} className={styles.stackChip}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Transition>
    </Section>
  );
}
