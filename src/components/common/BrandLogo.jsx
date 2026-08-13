import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrushStrokeBackground Component
 * Renders an artistic cosmetics paint brush stroke background behind the logo image
 * to ensure maximum visibility, contrast, and high-end aesthetic.
 */
export function PaintBrushStroke({ className = "", isDark = false }) {
  return (
    <svg
      viewBox="0 0 240 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none transition-transform duration-500 group-hover:scale-105 ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Golden Metallic Brush Gradient */}
        <linearGradient id="brushGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Deep Onyx / Charcoal Base Gradient */}
        <linearGradient id="brushBaseGradient" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={isDark ? "#1E293B" : "#0F172A"} />
          <stop offset="50%" stopColor={isDark ? "#090D16" : "#020617"} />
          <stop offset="100%" stopColor={isDark ? "#18181B" : "#09090B"} />
        </linearGradient>

        {/* Shimmer Pink / Rose Gold Tint */}
        <linearGradient id="brushRoseGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FB7185" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E11D48" stopOpacity="0.1" />
        </linearGradient>

        {/* Drop Shadow Filter for Depth */}
        <filter id="brushShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
        </filter>
        
        {/* Soft Glow Effect */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Ambient Paint Glow */}
      <path
        d="M12 45 C 30 18, 90 10, 160 15 C 210 18, 232 30, 228 48 C 224 66, 180 80, 110 78 C 45 76, 5 62, 12 45 Z"
        fill="url(#brushGoldGradient)"
        opacity="0.2"
        filter="url(#goldGlow)"
      />

      {/* Main Base Paint Brush Stroke - Solid Contrast Canvas */}
      <path
        d="M8 44 C 20 22, 60 14, 122 13 C 178 12, 222 22, 234 38 C 242 50, 226 68, 175 75 C 115 82, 38 78, 12 68 C 2 60, 2 52, 8 44 Z"
        fill="url(#brushBaseGradient)"
        filter="url(#brushShadow)"
      />

      {/* Paint Brush Bristle Texture - Layer 1 (Gold Swatch Sweep) */}
      <path
        d="M18 36 C 45 22, 110 18, 185 22 C 215 24, 230 32, 224 42 C 218 52, 170 65, 115 67 C 62 69, 22 58, 14 48 C 10 42, 12 38, 18 36 Z"
        fill="url(#brushGoldGradient)"
        opacity="0.85"
      />

      {/* Paint Brush Texture Lines (Feathered Dry Brush Details) */}
      <path
        d="M25 28 C 75 16, 150 18, 215 28"
        stroke="url(#brushGoldGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M15 48 C 65 58, 140 68, 225 54"
        stroke="#FDE68A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M30 62 C 80 72, 160 74, 210 64"
        stroke="url(#brushRoseGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Edge Paint Splatters & Bristle Fringes (Organic Brush Ends) */}
      <path d="M4 42 Q 0 44 2 46 Q 6 44 4 42 Z" fill="#F59E0B" />
      <path d="M236 34 Q 240 36 238 38 Q 234 36 236 34 Z" fill="#F59E0B" />
      <path d="M232 48 Q 237 51 233 54 Z" fill="#D97706" />
      <circle cx="236" cy="28" r="1.5" fill="#FDE68A" opacity="0.8" />
      <circle cx="228" cy="62" r="2" fill="#F59E0B" opacity="0.9" />
      <circle cx="6" cy="54" r="1.5" fill="#D97706" opacity="0.8" />
      <circle cx="12" cy="24" r="2" fill="#FDE68A" opacity="0.7" />
      <circle cx="18" cy="18" r="1" fill="#F59E0B" opacity="0.9" />

      {/* Inner High-Contrast Vignette framing logo */}
      <path
        d="M32 32 C 70 24, 150 24, 205 32 C 218 42, 205 56, 170 60 C 130 64, 60 62, 35 54 C 26 48, 25 38, 32 32 Z"
        fill="#000000"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * TextTitleUnderline Component
 * Stylish decorative paint brush line under the brand title text
 */
export function TitleBrushUnderline({ isDark = false }) {
  return (
    <svg
      viewBox="0 0 140 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-2.5 mt-0.5"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0.2" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M2 6 C 25 2, 60 9, 95 4 C 115 1, 130 7, 138 5"
        stroke="url(#underlineGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="98" cy="4" r="1.5" fill="#F59E0B" />
    </svg>
  );
}

/**
 * Main BrandLogo Component
 */
export default function BrandLogo({
  variant = "default", // 'default' | 'auth' | 'footer' | 'sidebar' | 'compact'
  size = "md",          // 'sm' | 'md' | 'lg' | 'xl'
  showTagline = true,
  className = "",
  linkTo = "/",
}) {
  const isDark = variant === "footer" || variant === "dark";

  // Responsive image dimensions tailored to the 1.86:1 luxury emblem badge
  const imgSizes = {
    sm: "h-9 sm:h-10 w-auto",
    md: "h-11 sm:h-13 md:h-14 w-auto",
    lg: "h-14 sm:h-16 md:h-20 w-auto",
    xl: "h-20 sm:h-24 md:h-28 w-auto",
  };

  const logoContent = (
    <div className={`inline-flex items-center group select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Soft Golden Glow Accent behind the Emblem */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* The Official Transparent Gold Luxury Company Logo Emblem */}
        <picture className="relative z-10 block">
          <source srcSet="/logo1.webp" type="image/webp" />
          <img
            src="/logo1.png"
            alt="My Glam Aura Logo"
            className={`${imgSizes[size]} object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.35)] group-hover:scale-[1.04] transition-transform duration-300`}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
