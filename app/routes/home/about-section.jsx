import profileImgLarge from '~/assets/profile-large.jpg';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import profileImg from '~/assets/profile.jpg';
import { Link } from '@remix-run/react';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import { portfolioContent } from './portfolio-content';
import styles from './about-section.module.css';

function emphasize(text) {
  return text
    .split(/(AI\/ML Engineer)/)
    .map((part, i) => (part === 'AI/ML Engineer' ? <strong key={i}>{part}</strong> : part));
}

function AboutText({ visible, titleId }) {
  const { title, paragraphs, resumeUrl, resumeFileName } = portfolioContent.about;

  return (
    <Fragment>
      <div className={styles.header}>
        <Divider
          className={styles.divider}
          notchWidth="64px"
          notchHeight="8px"
          collapsed={!visible}
          collapseDelay={400}
        />
        <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
          <DecoderText text={title} start={visible} delay={500} />
        </Heading>
      </div>
      {paragraphs.map((p, i) => (
        <Text key={i} className={styles.description} data-visible={visible} as="p">
          {emphasize(p)}
        </Text>
      ))}
      <div className={styles.actions}>
        <a
          className={styles.resumeButton}
          data-visible={visible}
          href={resumeUrl}
          download={resumeFileName}
        >
          <span className={styles.resumeGlyph} aria-hidden="true">
            ↓
          </span>
          Download resume
        </a>
        <Link
          to="/contact"
          prefetch="intent"
          className={styles.cta}
          data-visible={visible}
        >
          <span className={styles.ctaGlyph} aria-hidden="true">
            ➤
          </span>
          Get in touch
        </Link>
      </div>
    </Fragment>
  );
}

export function AboutSection({ id, visible, sectionRef }) {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.about}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible: animVisible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <AboutText visible={animVisible} titleId={titleId} />
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="56px"
                  notchHeight="4px"
                  collapsed={!animVisible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={animVisible}>
                  Intro
                </div>
              </div>
              <div className={styles.imageFrame}>
                <div className={styles.cornerTR} aria-hidden="true" />
                <div className={styles.cornerBL} aria-hidden="true" />
                <div className={styles.image}>
                  <Image
                    reveal
                    delay={100}
                    placeholder={profileImgPlaceholder}
                    srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                    width={960}
                    height={1280}
                    sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                    alt={portfolioContent.about.imageAlt}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
