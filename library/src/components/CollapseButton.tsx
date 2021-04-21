import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  chevronProps?: SVGAttributes<SVGElement>;
}

export const CollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  children,
  ...rest
}) => {
  return (
    <button {...rest} className={`focus:outline-none ${rest.className}`}>
      {children}
      <svg
        version="1.1"
        viewBox="0 0 24 24"
        x="0"
        xmlns="http://www.w3.org/2000/svg"
        y="0"
        {...chevronProps}
        className={`inline-block align-baseline cursor-pointer -mb-1 w-5 transform transition-transform duration-150 ease-linear ${chevronProps?.className ||
          ''}`}
      >
        <polygon points="17.3 8.3 12 13.6 6.7 8.3 5.3 9.7 12 16.4 18.7 9.7 " />
      </svg>
    </button>
  );
};
