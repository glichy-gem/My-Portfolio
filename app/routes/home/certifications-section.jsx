import { useEffect, useState } from 'react';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { classes, msToNum } from '~/utils/style';
import { portfolioContent } from './portfolio-content';
import styles from './certifications-section.module.css';

const ISSUER_LOGOS = {
  Anthropic: '/logos/anthropic.svg',
  Microsoft: '/logos/microsoft.svg',
  'Aisera Academy': '/logos/aisera.png',
  'Great Learning': '/logos/greatlearning.svg',
  'Infosys Springboard': '/logos/infosys.svg',
  'Ministry of Electronics and Information Technology': '/logos/meity.svg',
  HackerRank: '/logos/hackerrank.svg',
};

function Card({ cert }) {
  const hasLink = !!cert.credentialUrl;
  const Wrap = hasLink ? 'a' : 'div';
  const wrapProps = hasLink
    ? {
        href: cert.credentialUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `View credential for ${cert.name}`,
      }
    : {};
  const logoSrc = ISSUER_LOGOS[cert.issuer];

  return (
    <Wrap className={classes(styles.card, hasLink && styles.cardLink)} {...wrapProps}>
      <div className={styles.cardBody}>
        {logoSrc ? (
          <div className={styles.cardLogo}>
            <img src={logoSrc} alt="" loading="lazy" />
          </div>
        ) : null}
        <Text size="s" weight="medium" as="p" className={styles.cardName}>
          {cert.name}
        </Text>
        <Text secondary size="xs" as="p" className={styles.cardIssuer}>
          {cert.issuer}
        </Text>
        {cert.year ? (
          <Text secondary size="xs" as="p" className={styles.cardYear}>
            {cert.year}
          </Text>
        ) : null}
      </div>
      <div className={styles.cardFooter}>
        {cert.credentialId ? (
          <Text secondary size="xs" as="span" className={styles.cardId}>
            ID · {cert.credentialId}
          </Text>
        ) : (
          <span />
        )}
        {hasLink ? <Icon className={styles.cardLinkIcon} icon="link" /> : null}
      </div>
    </Wrap>
  );
}

const PINNED_MODAL_NAMES = [
  'Claude Certified Architect — Foundations',
  'Microsoft Certified: Azure AI Engineer Associate',
];

export function CertificationsSection({ id, visible, sectionRef }) {
  const { title, items } = portfolioContent.certifications;
  const titleId = `${id}-title`;
  const modalTitleId = `${id}-modal-title`;
  const [modalOpen, setModalOpen] = useState(false);
  const modalItems = [
    ...PINNED_MODAL_NAMES.map(name => items.find(cert => cert.name === name)).filter(Boolean),
    ...items.filter(cert => !PINNED_MODAL_NAMES.includes(cert.name)),
  ];

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = e => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

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
                <button
                  type="button"
                  className={styles.headingButton}
                  onClick={() => setModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={modalOpen}
                  aria-label={`${title} — view all`}
                >
                  <DecoderText text={title} start={animVisible} delay={300} />
                  <span className={styles.headingHint} aria-hidden="true">
                    View all
                  </span>
                </button>
              </Heading>
            </div>
            <div
              className={styles.marquee}
              data-visible={animVisible}
              role="region"
              aria-label="Certifications carousel"
            >
              <div className={styles.viewport}>
                <div className={styles.track}>
                  {items.map(cert => (
                    <Card key={cert.name} cert={cert} />
                  ))}
                </div>
                <div className={styles.track} aria-hidden="true">
                  {items.map(cert => (
                    <Card key={`dup-${cert.name}`} cert={cert} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>

      <Transition unmount in={modalOpen} timeout={msToNum(tokens.base.durationL)}>
        {({ visible: modalVisible, nodeRef }) => (
          <div
            ref={nodeRef}
            className={styles.modalBackdrop}
            data-visible={modalVisible}
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <div
              className={styles.modal}
              data-visible={modalVisible}
              onClick={e => e.stopPropagation()}
            >
              <header className={styles.modalHeader}>
                <Heading level={3} id={modalTitleId} className={styles.modalTitle}>
                  All certifications
                </Heading>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                >
                  <Icon icon="close" />
                </button>
              </header>
              <div className={styles.modalBody}>
                <div className={styles.modalGrid}>
                  {modalItems.map(cert => (
                    <Card key={cert.name} cert={cert} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
