import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './skills-section.module.css';

export function SkillsSection({ id, visible, sectionRef }) {
  const { title, groups } = portfolioContent.skills;
  const titleId = `${id}-title`;
  const leftGroups = groups.filter((_, i) => i % 2 === 0);
  const rightGroups = groups.filter((_, i) => i % 2 === 1);

  return (
    <Section
      className={styles.skills}
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
            <div className={styles.columns}>
              <ul className={styles.column}>
                {leftGroups.map(group => (
                  <li key={group.title} className={styles.group} data-visible={animVisible}>
                    <Text className={styles.groupTitle} size="s" as="h4">
                      {group.title}
                    </Text>
                    <ul className={styles.tags}>
                      {group.items.map(item => (
                        <li key={item} className={styles.tag}>
                          <Text secondary size="s" as="span">
                            {item}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <ul className={styles.column}>
                {rightGroups.map(group => (
                  <li key={group.title} className={styles.group} data-visible={animVisible}>
                    <Text className={styles.groupTitle} size="s" as="h4">
                      {group.title}
                    </Text>
                    <ul className={styles.tags}>
                      {group.items.map(item => (
                        <li key={item} className={styles.tag}>
                          <Text secondary size="s" as="span">
                            {item}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
