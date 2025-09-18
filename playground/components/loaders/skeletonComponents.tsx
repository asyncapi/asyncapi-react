import React from "react";
import styled from "styled-components";

// Wrapper with the same background as CodeEditorsWrapper
export const CodeEditorsWrapper = styled.div`
  background: rgb(38, 50, 56);
`;

// Base skeleton colors tuned for dark theme
const SkeletonBase = styled.div<{ width: string; height: string }>`
  background: rgba(69, 90, 100, 0.5);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
  width: ${(p) => p.width};
  height: ${(p) => p.height};

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
    style?: React.CSSProperties; // <-- add this
}

export const SkeletonLine: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '16px',
    className = '',
    style = {},
}) => (
    <div
        className={`rounded animate-pulse ${className}`}
        style={{ width, height, ...style }} // <-- merge inline styles
    />
);


export const SkeletonBox: React.FC<{
    width?: string;
    height?: string;
    className?: string;
}> = ({ width = "100%", height = "120px", className = "" }) => (
    <SkeletonBase width={width} height={height} className={className} />
);

export const NavigationSkeleton: React.FC = () => (
    <div className="flex flex-row w-full bg-[#263238] border-b-2 border-[#607d8b] h-12 px-4 items-center">
        {/* Icon skeleton (like NavigationHeaderIcon) */}
        <SkeletonBox
            width="34px"
            height="34px"
            className="rounded bg-[#37474F] mr-3"
        />

        {/* Text skeleton (like NavigationHeaderH1) */}
        <SkeletonLine
            width="160px"
            height="20px"
            className="bg-[#455A64]"
        />
    </div>
);


export const TabsSkeleton: React.FC = () => (
    <div style={{ background: "rgb(38, 50, 56)" }}>
        <div
            style={{
                display: "flex",
                borderBottom: "1px solid rgb(69, 90, 100)",
                padding: "0 16px",
            }}
        >
            <SkeletonLine
                width="80px"
                height="30px"
                className="mr-6 mt-3 mb-3"
                style={{ background: "rgba(69, 90, 100, 0.7)" }}
            />
            <SkeletonLine
                width="120px"
                height="30px"
                className="mt-3 mb-3"
                style={{ background: "rgba(69, 90, 100, 0.7)" }}
            />
        </div>

    </div>
);

export const CodeEditorSkeleton: React.FC = () => (
    <div style={{ background: "rgb(38, 50, 56)" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
            <SkeletonLine width="550px" height="36px" style={{ background: "rgba(120,144,156,0.4)" }} className="mt-3 ml-6"
            />
            <SkeletonLine width="120px" height="36px" style={{ background: "rgba(120,144,156,0.4)" }} className="mt-3 ml-2"
            />
        </div>
        <div
            style={{
                background: "rgba(46, 50, 53,1)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                height: "710px",        // make container full height
                justifyContent: "space-between", // distribute evenly
            }}
            className="ml-6 mr-6 mt-3"
        >
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                    <SkeletonLine
                        width={`${Math.random() * 60 + 40}%`}
                        height="16px"
                        className="ml-5 mr-10 mt-2"
                        style={{
                            background:
                                i % 4 === 0
                                    ? "rgba(120, 144, 156, 0.4)"
                                    : i % 4 === 1
                                        ? "rgba(100, 121, 130, 0.5)"
                                        : i % 4 === 2
                                            ? "rgba(84, 110, 122, 0.4)"
                                            : "rgba(100, 121, 130, 0.4)",
                        }}
                    />
                </div>
            ))}
        </div>

    </div>
);

export const DocumentationSkeleton: React.FC = () => (

    <div className="bg-white p-6 h-full overflow-y-auto">
        <div className="mb-6">
            <SkeletonLine width="300px" height="32px" className="mb-2 bg-gray-300" />
            <SkeletonLine width="200px" height="20px" className="bg-gray-200" />
        </div>

        <div className="mb-6">
            <SkeletonLine width="250px" height="24px" className="mb-3 bg-gray-300" />
            <SkeletonLine width="100%" height="16px" className="mb-2 bg-gray-200" />
            <SkeletonLine width="80%" height="16px" className="bg-gray-200" />
        </div>

        <div className="mb-6">
            <SkeletonLine width="200px" height="20px" className="mb-3 bg-gray-300" />
            <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <SkeletonBox width="20px" height="20px" className="bg-gray-300" />
                        <SkeletonLine width="70%" height="16px" className="bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-6">
            <SkeletonLine width="100px" height="20px" className="mb-3 bg-gray-300" />
            <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                    <SkeletonLine
                        key={i}
                        width="80px"
                        height="24px"
                        className="rounded-full bg-gray-300"
                    />
                ))}
            </div>
        </div>

        <div className="mb-6">
            <SkeletonLine width="120px" height="24px" className="mb-4 bg-gray-300" />
            <SkeletonBox
                width="100%"
                height="80px"
                className="mb-4 bg-gray-200 border border-gray-300"
            />
            <SkeletonLine width="90%" height="16px" className="mb-2 bg-gray-200" />
            <SkeletonLine width="75%" height="16px" className="bg-gray-200" />
        </div>
    </div>
);
