"use client";

interface AnimatedStarProps {
  className?: string;
}

export default function AnimatedStar({
  className = "",
}: AnimatedStarProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        className="h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main star */}
        <path
          className="star-draw"
          d="
            M250 42
            L302 181
            L451 187
            L333 278
            L372 421
            L250 339
            L128 421
            L167 278
            L49 187
            L198 181
            Z
          "
          stroke="rgba(255,31,61,0.75)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Imperfect sketch */}
        <path
          className="star-sketch"
          d="
            M252 48
            L308 177
            L444 191
            L329 273
            L366 414
            L249 333
            L133 416
            L171 274
            L56 190
            L194 176
            Z
          "
          stroke="rgba(255,31,61,0.25)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner star */}
        <path
          className="star-inner"
          d="
            M250 105
            L281 194
            L376 198
            L300 255
            L324 347
            L250 295
            L176 347
            L200 255
            L124 198
            L219 194
            Z
          "
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Decorative points */}
        <circle
          className="star-orbit-dot"
          cx="250"
          cy="42"
          r="4"
          fill="#ff1f3d"
        />

        <circle
          className="star-pulse-dot"
          cx="451"
          cy="187"
          r="2.5"
          fill="#ff1f3d"
        />

        <circle
          className="star-pulse-dot delay"
          cx="128"
          cy="421"
          r="2.5"
          fill="#ff1f3d"
        />
      </svg>

      <div className="absolute inset-[18%] -z-10 rounded-full bg-[#ff1f3d]/10 blur-[80px]" />
    </div>
  );
}