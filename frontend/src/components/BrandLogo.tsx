import React from "react";

interface BrandLogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    showTagline?: boolean;
    className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = "md", showTagline = false, className = "" }) => {
    const sizeClasses = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
    };

    return (
        <div className={`flex flex-col items-start leading-none ${className}`}>
            <div className={`font-extrabold tracking-tight ${sizeClasses[size]} flex items-center uppercase`}>
                <span className="text-[#0A0A0A]">KOM</span>
                <span className="text-[#C09A2E]">BAN</span>
            </div>
            {showTagline && (
                <span className={`text-[#9A7B1F] font-semibold tracking-wider uppercase ${size === 'xl' ? 'text-sm mt-1' : 'text-[0.55rem] mt-0.5'}`}>
                    Learning Hub
                </span>
            )}
        </div>
    );
};

export default BrandLogo;
