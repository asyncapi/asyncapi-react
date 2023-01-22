import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  chevronProps?: SVGAttributes<SVGElement>;
  expanded?: boolean;
}

const HiChevronRight = (props: SVGAttributes<SVGElement> = {}) => (
  // Copied from https://icon-sets.iconify.design/heroicons/chevron-right/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m8.25 4.5l7.5 7.5l-7.5 7.5"
    />
  </svg>
);

export const CollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  expanded = false,
  children,
  ...rest
}) => (
  <button
    {...rest}
    className={`focus:outline-none ${rest.className}`}
    type="button"
  >
    <div className="inline-block">{children}</div>
    <HiChevronRight
      {...chevronProps}
      className={`inline-block align-baseline cursor-pointer ml-0.5 -mb-1 w-5 h-5 transform transition-transform duration-150 ease-linear ${
        expanded ? '-rotate-90' : ''
      } ${chevronProps?.className || ''}`}
    />
  </button>
);
