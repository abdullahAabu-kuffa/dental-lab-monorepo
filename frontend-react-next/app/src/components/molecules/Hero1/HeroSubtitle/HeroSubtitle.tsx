'use client';

import { typography } from '../../../../../design-system/typography';
import { colors } from '../../../../../design-system/colors';
import HeroText from '../../../atoms/HeroText/HeroText';

export default function HeroSubtitle() {
  const beforeHighlight = "Revolutionizing dental restoration with";
  const highlightText = "ExoCAD";
  const afterHighlight = "integration, real-time tracking, and instant online payments";
  
  return (
    <HeroText
      text={`${beforeHighlight} ${afterHighlight}`}
      gradientText={highlightText}
      className={`${typography.subtitle} text-center max-w-2xl mx-auto mb-6`}
      style={{ color: colors.text.lightGray }}
      isGradient={true}
      delay={0.5}
    />
  );
}
