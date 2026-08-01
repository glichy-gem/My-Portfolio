import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './contact-section.module.css';

export function ContactSection({ id, visible, sectionRef }) {
  const {
    title,
    subtitle,
    email,
    linkedinUrl,
    linkedinLabel,
    githubUrl,
    githubLabel,
  } = portfolioContent.contact;
  const titleId = `${id}-title`;

  const cards = [
    email && {
      key: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      cta: 'Write to me',
    },
    linkedinUrl && {
      key: 'linkedin',
      label: 'LinkedIn',
      value: linkedinLabel || 'Connect',
      href: linkedinUrl,
      cta: 'Connect',
      external: true,
    },
    githubUrl && {
      key: 'github',
      label: 'GitHub',
      value: githubLabel || 'View my code',
      href: githubUrl,
      cta: 'Follow',
      external: true,
    },
  ].filter(Boolean);

  return (
    <Section
      className={styles.contact}
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
            <div className={styles.grid}>
              {cards.map((card, index) => (
                <a
                  key={card.key}
                  className={styles.card}
                  data-visible={animVisible}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                >
                  <div className={styles.cardBar} />
                  <Text as="span" className={styles.cardLabel}>
                    {card.label}
                  </Text>
                  <Text as="p" className={styles.cardValue}>
                    {card.value}
                  </Text>
                  <span className={styles.cardCta}>
                    {card.cta} <span className={styles.arrow}>{card.external ? '↗' : '→'}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className={styles.ctaRow}>
              <Button
                className={styles.formCta}
                data-visible={animVisible}
                iconHoverShift
                href="/contact"
                icon="send"
              >
                Open contact form
              </Button>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
