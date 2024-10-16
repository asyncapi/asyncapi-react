import React, { ReactNode } from "react";

interface TooltipWrapperProps {
  children: ReactNode;
  description?: string;
  className?: string;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  description,
  className,
}) => {
  if (!description) {
    return <>{children}</>;
  }

  return (
    <span title={description} className={className}>
      {children}
    </span>
  );
};
