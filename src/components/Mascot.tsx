import React from 'react';

interface MascotProps {
  pose?: 'welcome' | 'meditating' | 'survey' | 'shield' | 'support';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  pose = 'welcome',
  size = 'md',
  speechBubble,
  className = '',
}) => {
  const dimensions = {
    sm: { w: 90, h: 100 },
    md: { w: 140, h: 160 },
    lg: { w: 200, h: 225 },
    xl: { w: 280, h: 310 },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {speechBubble && (
        <div className="relative mb-2 px-3.5 py-2 bg-emerald-950/90 text-emerald-100 text-xs font-semibold rounded-2xl border border-emerald-400/30 shadow-lg shadow-emerald-950/50 max-w-[220px] text-center animate-bounce">
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-950/90 border-r border-b border-emerald-400/30 rotate-45" />
        </div>
      )}

      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_8px_24px_rgba(16,185,129,0.3)] transition-transform duration-300"
      >
        <defs>
          <linearGradient id="mascotCape" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="mascotSuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="mascotBrain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="mascotShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>

        {/* Cape floating behind */}
        <path
          d="M60 120 C30 140 20 185 35 205 C50 195 70 170 80 150 Z"
          fill="url(#mascotCape)"
          opacity="0.9"
        />
        <path
          d="M140 120 C170 140 180 185 165 205 C150 195 130 170 120 150 Z"
          fill="url(#mascotCape)"
          opacity="0.9"
        />

        {/* Body / Torso in Superhero Suit */}
        <path
          d="M75 115 C75 115 70 160 74 180 C85 185 115 185 126 180 C130 160 125 115 125 115 Z"
          fill="url(#mascotSuit)"
        />

        {/* Belt & Emerald Buckle */}
        <path d="M73 162 H127 V168 H73 Z" fill="#065F46" />
        <rect x="94" y="160" width="12" height="10" rx="3" fill="#34D399" />

        {/* Feet / Boots */}
        <ellipse cx="80" cy="192" rx="14" ry="7" fill="#1E293B" stroke="#34D399" strokeWidth="2" />
        <ellipse cx="120" cy="192" rx="14" ry="7" fill="#1E293B" stroke="#34D399" strokeWidth="2" />

        {/* Chest Emblem */}
        <circle cx="100" cy="138" r="14" fill="#047857" stroke="#6EE7B7" strokeWidth="1.5" />
        <path d="M96 138 L99 141 L105 134" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* HEAD */}
        {/* Radiating spark rays on top of head */}
        <path d="M100 12 L100 20" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M80 16 L84 24" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
        <path d="M120 16 L116 24" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />

        {/* Left Side: Brain */}
        <path
          d="M98 32 C82 32 70 38 64 46 C56 46 48 54 48 64 C44 70 44 80 48 88 C45 96 50 106 58 110 C68 116 85 116 98 114 Z"
          fill="url(#mascotBrain)"
        />
        {/* Brain sulci / folds */}
        <path d="M64 54 C60 62 68 70 76 66 M55 76 C62 76 68 84 64 92 M78 88 C82 96 90 94 92 104" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        {/* Right Side: Shield Face */}
        <path
          d="M102 32 C120 34 142 40 148 50 C150 68 152 95 134 108 C122 116 110 116 102 114 Z"
          fill="url(#mascotShield)"
        />
        <path
          d="M105 37 C118 39 136 44 141 53 C143 68 143 90 129 101 C120 108 112 109 105 107 Z"
          stroke="#CCFBF1"
          strokeWidth="2"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Shield Checkmark Badge in face cheek */}
        <path
          d="M125 58 L130 63 L138 52"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* EYES */}
        {pose === 'meditating' ? (
          <>
            {/* Meditating closed smiling eyes */}
            <path d="M72 74 Q80 80 88 74" stroke="#064E3B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M112 74 Q120 80 128 74" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Big friendly cartoon eyes */}
            <circle cx="78" cy="72" r="10" fill="#FFFFFF" />
            <circle cx="80" cy="71" r="5" fill="#047857" />
            <circle cx="82" cy="69" r="2" fill="#FFFFFF" />

            <circle cx="122" cy="72" r="10" fill="#FFFFFF" />
            <circle cx="120" cy="71" r="5" fill="#0369A1" />
            <circle cx="118" cy="69" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="68" cy="85" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
        <ellipse cx="132" cy="85" rx="5" ry="3" fill="#38BDF8" opacity="0.6" />

        {/* Happy Mouth */}
        <path
          d="M92 88 Q100 100 108 88"
          stroke="#064E3B"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="#DC2626"
        />

        {/* ARMS / POSES */}
        {pose === 'welcome' && (
          <>
            {/* Left Hand: Resting confident on hip */}
            <path d="M74 125 C60 135 55 145 68 155" stroke="#34D399" strokeWidth="8" strokeLinecap="round" />
            <circle cx="68" cy="155" r="7" fill="#10B981" />

            {/* Right Hand: Thumbs up high */}
            <path d="M126 125 C145 130 155 120 152 105" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="152" cy="102" r="7" fill="#22D3EE" />
            {/* Thumb */}
            <path d="M152 102 L152 92" stroke="#22D3EE" strokeWidth="5" strokeLinecap="round" />
          </>
        )}

        {pose === 'meditating' && (
          <>
            {/* Zen Lotus arms */}
            <path d="M74 128 C50 145 60 170 85 162" stroke="#34D399" strokeWidth="7" strokeLinecap="round" />
            <path d="M126 128 C150 145 140 170 115 162" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
            {/* Gyan mudra circles */}
            <circle cx="85" cy="162" r="6" fill="#34D399" />
            <circle cx="115" cy="162" r="6" fill="#38BDF8" />
          </>
        )}

        {pose === 'survey' && (
          <>
            {/* Holding Clipboard */}
            <path d="M74 128 C60 140 65 155 80 150" stroke="#34D399" strokeWidth="7" strokeLinecap="round" />
            <rect x="115" y="110" width="36" height="48" rx="4" fill="#F8FAFC" stroke="#047857" strokeWidth="2" />
            <rect x="125" y="106" width="16" height="6" rx="2" fill="#047857" />
            <line x1="122" y1="122" x2="144" y2="122" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <line x1="122" y1="130" x2="144" y2="130" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <line x1="122" y1="138" x2="138" y2="138" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="120" cy="148" r="6" fill="#38BDF8" />
          </>
        )}

        {pose === 'shield' && (
          <>
            {/* Big Safety Shield */}
            <path d="M125 125 C140 135 150 145 145 160" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
            <path d="M75 125 C60 135 50 145 55 160" stroke="#34D399" strokeWidth="7" strokeLinecap="round" />
            <path d="M90 120 C100 115 110 115 120 120 C125 145 115 165 105 175 C95 165 85 145 90 120 Z" fill="#047857" stroke="#34D399" strokeWidth="3" />
            <path d="M100 142 L104 146 L112 138" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {pose === 'support' && (
          <>
            {/* Holding heart */}
            <path d="M74 130 C60 145 75 160 90 152" stroke="#34D399" strokeWidth="7" strokeLinecap="round" />
            <path d="M126 130 C140 145 125 160 110 152" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
            {/* Glowing Heart */}
            <path
              d="M100 142 C95 135 85 138 85 146 C85 154 95 160 100 164 C105 160 115 154 115 146 C115 138 105 135 100 142 Z"
              fill="#EC4899"
              filter="drop-shadow(0 2px 6px rgba(236,72,153,0.5))"
            />
          </>
        )}
      </svg>
    </div>
  );
};
