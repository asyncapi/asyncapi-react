import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';
import { HiChevronRight } from 'react-icons/hi';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  chevronProps?: SVGAttributes<SVGElement>;
  expanded?: boolean;
}

export const CollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  expanded = false,
  children,
  ...rest
}) => (
  <button {...rest} className={`focus:outline-none ${rest.className}`}>
    <div className="inline-block">{children}</div>
    <HiChevronRight
      {...chevronProps}
      className={`inline-block align-baseline cursor-pointer ml-0.5 -mb-1 w-5 h-5 transform transition-transform duration-150 ease-linear ${
        expanded ? '-rotate-90' : ''
      } ${chevronProps?.className || ''}`}
    />
  </button>
);
