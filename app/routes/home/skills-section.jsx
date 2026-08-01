import { useEffect, useRef, useState } from 'react';
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

function SkillGroup({ group, index, onReveal, groupRef }) {
  const icon = GROUP_ICONS[group.title];
  return (
    <Transition in timeout={0} nodeRef={groupRef}>
      {({ visible, nodeRef }) => (
        <li
          className={styles.group}
          data-visible={visible}
          ref={nodeRef}
          tabIndex={0}
          onMouseEnter={() => onReveal(index)}
          onFocus={() => onReveal(index)}
        >
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
      )}
    </Transition>
  );
}

export function SkillsSection({ id, visible, sectionRef }) {
  const { title, subtitle, groups } = portfolioContent.skills;
  const titleId = `${id}-title`;
  const [revealedCount, setRevealedCount] = useState(1);
  const [sectionEntered, setSectionEntered] = useState(false);
  const frontierRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const noHover = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (noHover) setRevealedCount(groups.length);
  }, [groups.length]);

  const revealNext = index => {
    setRevealedCount(prev => Math.min(groups.length, Math.max(prev, index + 2)));
  };

  useEffect(() => {
    if (!sectionEntered || revealedCount >= groups.length) return;
    const node = frontierRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealedCount(prev => Math.min(groups.length, prev + 1));
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionEntered, revealedCount, groups.length]);

  return (
    <Section
      className={styles.skills}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEntered={() => setSectionEntered(true)}>
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
                <Heading
                  className={styles.heading}
                  level={3}
                  id={titleId}
                  data-visible={animVisible}
                >
                  <DecoderText text={title} start={animVisible} delay={300} />
                </Heading>
                {subtitle ? (
                  <Text as="p" className={styles.subtitle} data-visible={animVisible}>
                    {subtitle}
                  </Text>
                ) : null}
              </div>
            </div>
            {animVisible && (
              <ul className={styles.column}>
                {groups.slice(0, revealedCount).map((group, index) => (
                  <SkillGroup
                    key={group.title}
                    group={group}
                    index={index}
                    onReveal={revealNext}
                    groupRef={index === revealedCount - 1 ? frontierRef : undefined}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </Transition>
    </Section>
  );
}
