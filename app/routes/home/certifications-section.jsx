import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './certifications-section.module.css';

export function CertificationsSection({ id, visible, sectionRef }) {
  const { title, items } = portfolioContent.certifications;
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.certifications}
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
            <ul className={styles.list}>
              {items.map((cert, index) => (
                <li
                  key={cert.name}
                  className={styles.item}
                  data-visible={animVisible}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Text size="l" as="p" className={styles.name}>
                    {cert.name}
                  </Text>
                  <Text secondary size="s" as="p">
                    {[cert.issuer, cert.year].filter(Boolean).join(' · ')}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Transition>
    </Section>
  );
}
