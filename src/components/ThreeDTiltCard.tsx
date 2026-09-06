import React, { useRef, useState, useCallback } from 'react';
import { playHoverSound, SoundEffectType } from '../utils/soundEffects';

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  enableGlare?: boolean;
  enableSound?: boolean;
  soundType?: SoundEffectType;
  onClick?: () => void;
  id?: string;
}

export const ThreeDTiltCard: React.FC<ThreeDTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  enableGlare = true,
  enableSound = true,
  soundType = 'pop',
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // -1 to 1 normalized
      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;

      const rotateY = Number((normalizedX * maxTilt).toFixed(2));
      const rotateX = Number((-normalizedY * maxTilt).toFixed(2));

      setTransform(
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
      );

      if (enableGlare) {
        setGlarePosition({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.22,
        });
      }
    },
    [maxTilt, enableGlare]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (enableSound) {
      playHoverSound(soundType as SoundEffectType);
    }
  }, [enableSound, soundType]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease-out',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* 3D Content Container */}
      <div style={{ transformStyle: 'preserve-3d' }} className="w-full h-full">
        {children}
      </div>

      {/* Dynamic Specular Glare Overlay */}
      {enableGlare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};
