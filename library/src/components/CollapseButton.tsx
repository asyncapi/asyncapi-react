import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  chevronProps?: SVGAttributes<SVGElement>;
}

export const CollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  children,
  ...rest
}) => (
  <button {...rest} className={`focus:aui-outline-none ${rest.className}`}>
    {children}
    <svg
      version="1.1"
      viewBox="0 0 24 24"
      x="0"
      xmlns="http://www.w3.org/2000/svg"
      y="0"
      {...chevronProps}
      className={`aui-inline-block aui-align-baseline aui-cursor-pointer aui--mb-1 aui-w-5 aui-transform aui-transition-transform aui-duration-150 aui-ease-linear ${chevronProps?.className ||
        ''}`}
    >
      <polygon points="17.3 8.3 12 13.6 6.7 8.3 5.3 9.7 12 16.4 18.7 9.7 " />
    </svg>
  </button>
);
