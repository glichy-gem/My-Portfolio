import { Intro } from './intro';
import { portfolioContent } from './portfolio-content';

export function HeroSection({ id, sectionRef, scrollIndicatorHidden }) {
  const h = portfolioContent.hero;

  return (
    <Intro
      id={id}
      sectionRef={sectionRef}
      scrollIndicatorHidden={scrollIndicatorHidden}
      name={h.name}
      role={h.role}
      tagline={h.tagline}
      focusAreas={h.focusAreas}
      scrollTargetId={h.scrollTargetId}
    />
  );
}
