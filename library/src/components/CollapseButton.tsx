import React, { ButtonHTMLAttributes, SVGAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  chevronProps?: SVGAttributes<SVGElement>;
  expanded?: boolean;
}

const HiChevronRight = (props: SVGAttributes<SVGElement> = {}) => (
  // Copied from https://icon-sets.iconify.design/heroicons-solid/chevron-right/
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 20 20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const CollapseButton: React.FunctionComponent<Props> = ({
  chevronProps,
  expanded = false,
  children,
  ...rest
}) => (
  <div
    {...rest}
    className={`focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${rest.className ?? ''}`}
    type="button"
  >
    <div className="inline-block">{children}</div>
    <HiChevronRight
      {...chevronProps}
      className={`inline-block align-baseline cursor-pointer ml-0.5 -mb-1 w-5 h-5 transform transition-transform duration-150 ease-linear ${
        expanded ? '-rotate-90' : ''
      } ${chevronProps?.className ?? ''}`}
    />
  </div>
);
