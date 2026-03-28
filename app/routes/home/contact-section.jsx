import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { portfolioContent } from './portfolio-content';
import styles from './contact-section.module.css';

export function ContactSection({ id, visible, sectionRef }) {
  const { title, intro, email, linkedinUrl, githubUrl } = portfolioContent.contact;
  const titleId = `${id}-title`;
  const mailto = email ? `mailto:${email}` : '';

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
              <Heading className={styles.heading} level={3} id={titleId} data-visible={animVisible}>
                <DecoderText text={title} start={animVisible} delay={300} />
              </Heading>
            </div>
            <Text className={styles.intro} size="l" as="p" data-visible={animVisible}>
              {intro}
            </Text>
            <ul className={styles.links} data-visible={animVisible}>
              {email ? (
                <li>
                  <Link href={mailto}>{email}</Link>
                </li>
              ) : null}
              {linkedinUrl ? (
                <li>
                  <Link href={linkedinUrl}>LinkedIn</Link>
                </li>
              ) : null}
              {githubUrl ? (
                <li>
                  <Link href={githubUrl}>GitHub</Link>
                </li>
              ) : null}
            </ul>
            <Button
              className={styles.formCta}
              data-visible={animVisible}
              secondary
              iconHoverShift
              href="/contact"
              icon="send"
            >
              Open contact form
            </Button>
          </div>
        )}
      </Transition>
    </Section>
  );
}
