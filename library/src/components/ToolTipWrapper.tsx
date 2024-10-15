import React, { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

interface TooltipWrapperProps {
  children: ReactNode;
  description?: string;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ children, description }) => {
  if (!description) {
    return <>{children}</>;
  }

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <span>{children}</span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white shadow-md"
            sideOffset={5}
          >
            {description}
            <RadixTooltip.Arrow className="fill-gray-800" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};