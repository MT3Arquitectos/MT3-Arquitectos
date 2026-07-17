import { useState, createContext, useContext } from 'react';
import type { MouseEvent, ReactNode, TouchEvent } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion';

interface ImageComparisonContextValue {
  sliderPosition: number;
  setSliderPosition: (value: number) => void;
  motionSliderPosition: MotionValue<number>;
}

const ImageComparisonContext = createContext<ImageComparisonContextValue | null>(null);

function useImageComparison(): ImageComparisonContextValue {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) {
    throw new Error('ImageComparison components must be used within <ImageComparison>');
  }
  return ctx;
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = { bounce: 0, duration: 0 };

interface ImageComparisonProps {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
}

export const ImageComparison = ({
  children,
  className = '',
  enableHover = false,
  springOptions,
}: ImageComparisonProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions || DEFAULT_SPRING_OPTIONS
  );
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging && !enableHover) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clientX =
      'touches' in event ? event.touches[0]?.clientX ?? 0 : event.clientX;
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);

    motionValue.set(pct);
    setSliderPosition(pct);
  };

  const containerClasses = `
    relative overflow-hidden select-none
    ${enableHover ? 'cursor-ew-resize' : ''}
    ${className}
  `;

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={containerClasses}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
};

interface ImageComparisonImageProps {
  src: string;
  alt: string;
  position: 'left' | 'right';
  className?: string;
}

export const ImageComparisonImage = ({
  src,
  alt,
  position,
  className = '',
}: ImageComparisonImageProps) => {
  const { motionSliderPosition } = useImageComparison();
  const clipLeft = useTransform(motionSliderPosition, (v) => `inset(0 0 0 ${v}%)`);
  const clipRight = useTransform(motionSliderPosition, (v) => `inset(0 ${100 - v}% 0 0)`);

  const imgClasses = `absolute inset-0 h-full w-full object-cover ${className}`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={imgClasses}
      style={{
        clipPath: position === 'left' ? clipLeft : clipRight,
      }}
    />
  );
};

interface ImageComparisonSliderProps {
  children?: ReactNode;
  className?: string;
}

export const ImageComparisonSlider = ({
  children,
  className = '',
}: ImageComparisonSliderProps) => {
  const { motionSliderPosition } = useImageComparison();
  const left = useTransform(motionSliderPosition, (v) => `${v}%`);

  const sliderClasses = `absolute top-0 bottom-0 w-1 cursor-ew-resize ${className}`;

  return (
    <motion.div className={sliderClasses} style={{ left }}>
      {children}
    </motion.div>
  );
};
