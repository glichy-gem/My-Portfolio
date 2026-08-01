import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { classes } from '~/utils/style';
import { portfolioContent } from './portfolio-content';
import styles from './articles-section.module.css';

function ArticleCard({ article, visible, index }) {
  const { title, summary, source, readTime, url } = article;

  return (
    <a
      className={styles.card}
      data-visible={visible}
      style={{ transitionDelay: `${index * 80}ms` }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.cardBar} />
      <div className={styles.cardMeta}>
        {source ? (
          <span className={styles.sourcePill}>
            <span className={styles.sourceDot} />
            {source}
          </span>
        ) : <span />}
        {readTime ? (
          <Text as="span" className={styles.readTime}>
            {readTime}
          </Text>
        ) : null}
      </div>
      <Heading className={styles.cardTitle} level={4} as="h3">
        {title}
      </Heading>
      <Text size="m" as="p" className={styles.summary}>
        {summary}
      </Text>
      <div className={styles.cardFooter}>
        <span>Read article</span>
        <span className={styles.arrow}>→</span>
        <span className={styles.footerLine} />
      </div>
    </a>
  );
}

export function ArticlesSection({ id, visible, sectionRef }) {
  const { title, subtitle, items } = portfolioContent.articles;
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.articles}
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
            <div className={classes(styles.grid)}>
              {items.map((article, index) => (
                <ArticleCard
                  key={article.title}
                  article={article}
                  visible={animVisible}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
