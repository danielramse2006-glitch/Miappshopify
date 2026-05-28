import React from "react";

interface ModaBelleLogoProps {
  className?: string;
  showMonogram?: boolean;
  monogramSize?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
}

export default function ModaBelleLogo({
  className = "",
  showMonogram = true,
  monogramSize = "md",
  orientation = "vertical"
}: ModaBelleLogoProps) {
  const monogramDimensions = {
    sm: "h-8 w-8 text-xl",
    md: "h-14 w-14 text-3xl",
    lg: "h-24 w-24 text-5xl"
  };

  const monogramSVGSize = {
    sm: 32,
    md: 56,
    lg: 96
  };

  const selectedSize = monogramSize;

  // Custom high-quality vector rendering of the "MB" ligature logo based on user specification
  const renderMonogram = () => {
    return (
      <svg
        viewBox="0 0 120 120"
        width={monogramSVGSize[selectedSize]}
        height={monogramSVGSize[selectedSize]}
        className="text-stone-950 fill-current select-none"
        aria-hidden="true"
      >
        {/* We use highly precise paths to construct a gorgeous high-fidelity overlapping ligature trademark */}
        <g stroke="none" fillRule="evenodd">
          {/* M Left Stem with serifs */}
          <path d="M 18,85 L 18,80 L 22,80 L 22,40 L 18,40 L 18,35 L 32,35 L 32,40 L 28,40 L 28,80 L 32,80 L 32,85 Z" />
          
          {/* M Diagonal to Center & Overlap of Ligature */}
          <path d="M 28,40 L 46,75 L 54,58 C 50,56 46,50 46,45 C 46,38 52,32 58,32 C 65,32 70,38 70,45 C 70,52 64,58 58,60 C 58,68 62,72 68,72 L 74,72 L 74,78 C 66,78 60,74 58,68 L 50,85 Z" className="opacity-0 hidden" />
          
          {/* Real Handcrafted Vector Ligature Paths */}
          {/* Main M Shape with Serifs and Clean Join */}
          <path d="M26,38 C28,38 29,39 29,41 L29,78 C29,80 28,81 26,81 L24,81 L24,85 L40,85 L40,81 L38,81 C36,81 35,80 35,78 L35,46 L49,78 L53,78 L65,49 L65,78 C65,80 64,81 62,81 L60,81 L60,85 L74,85 L74,81 L72,81 C70,81 69,80 69,78 L69,45 L73,45 L73,41 L61,41 L61,45 L63,45 C64,45 65,46 65,48 L65,56 L51,85 L47,85 L33,48 C32,46 31,45 29,45 L26,45 L26,38 Z" />
          
          {/* Overlapping B Shape curves interlinked */}
          <path d="M56,38 C68,38 78,41 78,51 C78,57 73,61 68,63 C75,65 81,70 81,78 C81,87 70,91 56,91 L44,91 L44,87 L48,87 C50,87 51,86 51,84 L51,45 C51,43 50,42 48,42 L44,42 L44,38 L56,38 Z M51,46 L51,61 C55,61 60,60 62,58 C65,56 66,52 66,49 C66,44 61,42 56,42 M51,65 L51,83 L56,83 C62,83 68,81 70,78 C72,75 73,71 73,67 C73,64 69,61 62,61 L51,65 Z animate-pulse" className="mix-blend-multiply" />
          
          {/* Center stylized loop matching the elegant flourish ligature */}
          <path d="M58,62 C69,62 76,66 79,73 C81,77 82,82 81,86 C79,90 74,94 65,95 C54,96 46,92 41,84 L45,81 C48,87 54,91 62,91 C68,91 74,87 75,81 C76,77 73,72 65,70 C59,68 53,67 47,69 L48,65 L58,62 Z" />
        </g>
      </svg>
    );
  };

  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center gap-3 select-none leading-none ${className}`}>
        {showMonogram && renderMonogram()}
        <div className="flex flex-col text-left justify-center">
          <span className="font-serif text-lg md:text-xl font-semibold tracking-wide text-stone-950 leading-tight">
            ModaBelle
          </span>
          <span className="font-sans text-[9px] font-extrabold tracking-[0.25em] text-stone-500 uppercase leading-none mt-0.5">
            MX
          </span>
        </div>
      </div>
    );
  }

  // Vertical layout (default from user screenshot)
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {showMonogram && (
        <div className="mb-2.5 transition duration-300 hover:scale-[1.03]">
          {renderMonogram()}
        </div>
      )}
      <h1 className="font-serif text-2xl md:text-3.5xl font-normal tracking-wide text-stone-950 leading-none">
        ModaBelle
      </h1>
      <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.35em] text-stone-800 uppercase mt-2.5 leading-none pl-[0.35em]">
        MX
      </span>
    </div>
  );
}
