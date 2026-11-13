import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, className = '' }) => {
  const iconDimensions = {
    sm: { w: 34, h: 34, title: 'text-lg', sub: 'text-[9px]' },
    md: { w: 46, h: 46, title: 'text-2xl', sub: 'text-[10px]' },
    lg: { w: 68, h: 68, title: 'text-3xl', sub: 'text-xs' },
    xl: { w: 92, h: 92, title: 'text-4xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* SVG Brain + Shield Logo Icon */}
        <div className="relative flex items-center justify-center filter drop-shadow-[0_4px_16px_rgba(16,185,129,0.25)]">
          <svg
            width={iconDimensions.w}
            height={iconDimensions.h}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Spark Rays on top */}
            <path d="M50 8L50 14" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
            <path d="M33 13L36 18" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M67 13L64 18" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M22 23L27 26" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />

            {/* Left Brain Half */}
            <path
              d="M48 20C42 20 37 23 34 26C30 25 24 28 22 34C19 36 17 41 18 46C15 50 16 57 19 61C17 65 19 72 23 75C27 80 34 82 40 82C44 82 48 80 48 80V20Z"
              fill="url(#brainGrad)"
            />

            {/* Brain Internal Gyri lines */}
            <path
              d="M34 32C32 36 30 42 35 44C40 46 44 42 44 38M25 48C28 47 33 50 32 55C31 60 26 62 26 66M36 68C38 65 42 67 44 71"
              stroke="#064E3B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.65"
            />

            {/* Right Shield Half */}
            <path
              d="M52 20C62 22 75 25 80 32C81 46 82 66 69 77C62 83 55 86 52 87V20Z"
              fill="url(#shieldGrad)"
            />

            {/* Inner Shield Bevel outline */}
            <path
              d="M55 24C63 26 73 28 77 34C78 45 78 63 67 73C62 78 57 81 55 82V24Z"
              stroke="#CCFBF1"
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
            />

            {/* White Checkmark inside shield */}
            <path
              d="M58 52L65 59L76 43"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text Brand */}
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1.5 tracking-tight font-extrabold font-['Outfit',sans-serif]">
            <span className={`${iconDimensions.title} text-white`}>mente</span>
            <span className={`${iconDimensions.title} text-emerald-400 font-black`}>segura</span>
          </div>
        </div>
      </div>

      {showSubtitle && (
        <div className={`mt-1 tracking-wider uppercase font-semibold text-emerald-400/90 ${iconDimensions.sub} flex items-center gap-1.5`}>
          <span className="h-[1px] w-3 bg-emerald-400/40"></span>
          <span>Cuidar da mente é proteger a vida</span>
          <span className="h-[1px] w-3 bg-emerald-400/40"></span>
        </div>
      )}
    </div>
  );
};
