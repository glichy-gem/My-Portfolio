import { useEffect, useRef, useState } from 'react';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { msToNum } from '~/utils/style';
import { portfolioContent } from './portfolio-content';
import styles from './projects-section.module.css';

function MetaChips({ project, className }) {
  const { category, status } = project;

  return (
    <div className={className}>
      {category ? <span className={styles.metaChip}>{category}</span> : null}
      {status ? (
        <span className={styles.metaChip} data-status="true">
          {status}
        </span>
      ) : null}
    </div>
  );
}

/** Renders `Project title | AWS + Azure`. */
function TitleWithCloud({ title, cloud }) {
  return (
    <>
      {title}
      {cloud ? (
        <>
          <span className={styles.titleSep} aria-hidden="true">
            |
          </span>
          <span className={styles.cloudLabel}>{cloud}</span>
        </>
      ) : null}
    </>
  );
}

function ProjectCard({ project, visible, index, onOpen }) {
  const { title, cloud, summary, stackShort, stack, featured } = project;
  const chips = stackShort?.length ? stackShort : stack;

  return (
    <button
      type="button"
      className={styles.card}
      data-visible={visible}
      style={{ transitionDelay: `${index * 70}ms` }}
      onClick={onOpen}
      aria-haspopup="dialog"
    >
      <span className={styles.cardBar} aria-hidden="true" />
      <span className={styles.cardTop}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {featured ? 'Featured project' : 'Project'}
        </span>
        <MetaChips project={project} className={styles.metaRow} />
      </span>

      <span className={styles.cardTitle}>
        <TitleWithCloud title={title} cloud={cloud} />
      </span>

      <span className={styles.summary}>{summary}</span>

      <span className={styles.stackLine}>
        {chips.map((tech, i) => (
          <span key={tech} className={styles.stackItem}>
            {i > 0 ? (
              <span className={styles.stackDot} aria-hidden="true">
                ·
              </span>
            ) : null}
            {tech}
          </span>
        ))}
      </span>

      <span className={styles.expandRow}>
        <span className={styles.expandLabel}>View details</span>
        <span className={styles.expandIcon} aria-hidden="true">
          +
        </span>
        <span className={styles.expandLine} aria-hidden="true" />
      </span>
    </button>
  );
}

function ProjectDetail({ project, titleId }) {
  const {
    title,
    cloud,
    overview,
    capabilities,
    highlights,
    scale,
    scaleLabel,
    stack,
    demoUrl,
    repoUrl,
  } = project;

  return (
    <>
      <Heading level={3} id={titleId} className={styles.modalTitle}>
        <TitleWithCloud title={title} cloud={cloud} />
      </Heading>

      <MetaChips project={project} className={styles.modalMetaRow} />

      {overview?.length ? (
        <section className={styles.detailBlock}>
          <h4 className={styles.detailLabel}>Overview</h4>
          {overview.map((para, i) => (
            <Text as="p" key={i} className={styles.detailBody}>
              {para}
            </Text>
          ))}
        </section>
      ) : null}

      {capabilities?.length ? (
        <section className={styles.detailBlock}>
          <h4 className={styles.detailLabel}>Key capabilities</h4>
          <ul className={styles.capabilityList}>
            {capabilities.map(item => (
              <li key={item.term} className={styles.capabilityItem}>
                <span className={styles.bulletMarker} aria-hidden="true">
                  ▸
                </span>
                <span>
                  <strong className={styles.capabilityTerm}>{item.term}</strong> {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {highlights?.length ? (
        <section className={styles.detailBlock}>
          <h4 className={styles.detailLabel}>Technical highlights</h4>
          <div className={styles.highlightGrid}>
            {highlights.map(item => (
              <div key={item.title} className={styles.highlight}>
                <h5 className={styles.highlightTitle}>{item.title}</h5>
                <Text as="p" className={styles.highlightBody}>
                  {item.detail}
                </Text>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {scale?.length ? (
        <section className={styles.detailBlock}>
          <h4 className={styles.detailLabel}>{scaleLabel || 'Scale'}</h4>
          <ul className={styles.scaleList}>
            {scale.map(line => (
              <li key={line} className={styles.scaleItem}>
                <span className={styles.bulletMarker} aria-hidden="true">
                  ▸
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {stack?.length ? (
        <section className={styles.detailBlock}>
          <h4 className={styles.detailLabel}>Tech stack</h4>
          <div className={styles.stackChips}>
            {stack.map(tech => (
              <span key={tech} className={styles.stackChip}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {demoUrl || repoUrl ? (
        <div className={styles.links}>
          {demoUrl ? (
            <a
              className={styles.projectLink}
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View demo</span>
              <span className={styles.arrow}>↗</span>
              <span className={styles.linkLine} />
            </a>
          ) : null}
          {repoUrl ? (
            <a
              className={styles.projectLink}
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View on GitHub</span>
              <span className={styles.arrow}>↗</span>
              <span className={styles.linkLine} />
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function ProjectsSection({ id, visible, sectionRef }) {
  const { title, subtitle, items } = portfolioContent.projects;
  const titleId = `${id}-title`;
  const modalTitleId = `${id}-modal-title`;

  const [open, setOpen] = useState(false);
  // Kept after close so detail content survives the modal's exit animation.
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  const openProject = (index, event) => {
    triggerRef.current = event.currentTarget;
    setActiveIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, [open]);

  const activeProject = items[activeIndex];

  return (
    <Section
      className={styles.projects}
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
            <div className={styles.list}>
              {items.map((project, index) => (
                <ProjectCard
                  key={project.slug || project.title}
                  project={project}
                  visible={animVisible}
                  index={index}
                  onOpen={event => openProject(index, event)}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>

      <Transition unmount in={open} timeout={msToNum(tokens.base.durationL)}>
        {({ visible: modalVisible, nodeRef }) => (
          <div
            ref={nodeRef}
            className={styles.modalBackdrop}
            data-visible={modalVisible}
            onClick={() => setOpen(false)}
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
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} aria-hidden="true" />
                  {activeProject?.featured ? 'Featured project' : 'Project'}
                </span>
                <button
                  type="button"
                  ref={closeRef}
                  className={styles.modalClose}
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <Icon icon="close" />
                </button>
              </header>
              <div className={styles.modalBody}>
                {activeProject ? (
                  <ProjectDetail project={activeProject} titleId={modalTitleId} />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
