import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  chevronProps?: SVGAttributes<SVGElement>;
}

export const CollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  children,
  ...rest
}) => (
  <button {...rest} className={`focus:outline-none ${rest.className}`}>
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      stroke="currentColor"
      version="1.1"
      x="0"
      y="0"
      fill="none"
      {...chevronProps}
      className={`inline-block align-baseline cursor-pointer -mb-1 ml-1 w-3.5 h-3.5 transform transition-transform duration-150 ease-linear ${chevronProps?.className ||
        ''}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
);

export const DoubleCollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  children,
  ...rest
}) => (
  <button {...rest} className={`focus:outline-none ${rest.className}`}>
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      stroke="currentColor"
      version="1.1"
      x="0"
      y="0"
      fill="none"
      {...chevronProps}
      className={`inline-block align-baseline cursor-pointer -mb-1 ml-1 w-3.5 h-3.5 transform transition-transform duration-150 ease-linear ${chevronProps?.className ||
        ''}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
      />
    </svg>
  </button>
);
