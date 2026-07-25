import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './skills-section.module.css';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const GROUP_ICONS = {
  'Languages & backend': (
    <svg {...iconProps}>
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </svg>
  ),
  'AI / ML': (
    <svg {...iconProps}>
      <path d="M12 3l1.7 4.5L18 9l-4.3 1.5L12 15l-1.7-4.5L6 9l4.3-1.5z" />
      <path d="M18.5 14.5l0.9 2.3 2.3 0.9-2.3 0.9-0.9 2.3-0.9-2.3L15.3 17.7l2.3-0.9z" />
    </svg>
  ),
  Cloud: (
    <svg {...iconProps}>
      <path d="M17.5 19h-11a4.5 4.5 0 0 1-0.6-8.97 6 6 0 0 1 11.73-1.6 4.5 4.5 0 0 1-0.13 10.57z" />
    </svg>
  ),
  Data: (
    <svg {...iconProps}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  'Tools / search': (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  ),
};

function SkillGroup({ group, visible }) {
  const icon = GROUP_ICONS[group.title];
  return (
    <li className={styles.group} data-visible={visible}>
      <div className={styles.groupHeader}>
        {icon && <span className={styles.groupIcon}>{icon}</span>}
        <Text className={styles.groupTitle} size="s" as="h4">
          {group.title}
        </Text>
      </div>
      <ul className={styles.tags}>
        {group.items.map((item, i) => (
          <li key={item} className={styles.tag} style={{ '--i': i }}>
            <Text size="s" as="span">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </li>
  );
}

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
              <Heading
                className={styles.heading}
                level={3}
                id={titleId}
                data-visible={animVisible}
              >
                <DecoderText text={title} start={animVisible} delay={300} />
              </Heading>
            </div>
            <div className={styles.columns}>
              <ul className={styles.column}>
                {leftGroups.map(group => (
                  <SkillGroup key={group.title} group={group} visible={animVisible} />
                ))}
              </ul>
              <ul className={styles.column}>
                {rightGroups.map(group => (
                  <SkillGroup key={group.title} group={group} visible={animVisible} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
