import React, { HTMLAttributes, SVGAttributes } from 'react';
import { HiLink } from 'react-icons/hi';

interface Props extends HTMLAttributes<HTMLDivElement> {
  anchor: string;
  iconProps?: SVGAttributes<SVGElement>;
}

export const AnchorWrapper: React.FunctionComponent<Props> = ({
  children,
  anchor,
  iconProps,
  ...rest
}) => (
  <div {...rest} className={`anchor-wrapper relative ${rest.className || ''}`}>
    <a
      className="anchor block px-2 duration-150 text-gray-500"
      href={`#${anchor}`}
    >
      <HiLink
        {...iconProps}
        className={`absolute inline-block w-5 h-5 ${iconProps?.className ||
          ''}`}
      />
    </a>
    <div>{children}</div>
  </div>
);
