import { Box, Typography, TypographyProps } from '@mui/material';
import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface AnimatedLetterProps {
  letter: string;
  delay: number;
  isAnimated: boolean;
  offsetY: number;
  style?: CSSProperties;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ letter, delay, isAnimated, offsetY, style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAnimated) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAnimated, delay]);

  return (
    <Typography
      style={{
        display: 'inline-block',
        transition: 'all 500ms ease-out',
        transform: isVisible ? `translateY(0)` : `translateY(${offsetY}px)`,
        opacity: isVisible ? 1 : 0,
        ...style,
      }}
    >
      {letter}
    </Typography>
  );
};


interface LetterByLetterProps extends Omit<TypographyProps, 'children'>  {
  text: string;
  isAnimated?: boolean;
  delay?: number;
  offsetY?: number;
  style?: CSSProperties;
  startDelay?: number;
}

export const LetterByLetter: React.FC<LetterByLetterProps> = ({ text, isAnimated, delay, offsetY, startDelay, style, }) => {
  const lines = text.split('\n');
  let totalIndex = 0;
  return (
    <Box>
      {lines.map((line, lineIndex) => (
        <Typography key={lineIndex} component="div" style={style}>
          {line.split('').map((letter) => {
            const currentIndex = totalIndex++;
            return (
              <AnimatedLetter
                key={`${lineIndex}-${currentIndex}`}
                letter={letter}
                delay={(startDelay ?? 0) + currentIndex * (delay ?? 150)}
                isAnimated={isAnimated ?? false}
                offsetY={offsetY ?? 10}
                style={style}
              />
            );
          })}
        </Typography>
      ))}
    </Box>
  );
};

export default LetterByLetter;