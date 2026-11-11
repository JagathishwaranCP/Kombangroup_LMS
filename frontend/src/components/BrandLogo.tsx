import React from "react";

interface BrandLogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    showTagline?: boolean;
    className?: string;
    variant?: "default" | "light";
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = "md", showTagline = false, className = "", variant = "default" }) => {
    const heightClasses = {
        sm: "h-8",
        md: "h-10",
        lg: "h-14",
        xl: "h-20",
    };

    const taglineColor = variant === "light" ? "text-blue-200" : "text-[#5755D9]";

    return (
        <div className={`flex flex-col items-start leading-none ${className}`}>
            <img
                src="/cloudconnekt-logo.png"
                alt="CloudConnekt"
                className={`${heightClasses[size]} w-auto object-contain`}
            />
            {showTagline && (
                <span className={`${taglineColor} font-semibold tracking-wider uppercase ${size === "xl" ? "text-sm mt-2" : "text-[0.55rem] mt-1"}`}>
                    Learning Hub
                </span>
            )}
        </div>
    );
};

export default BrandLogo;
