import React from 'react';

import { bemClasses } from '../helpers';
import {
  DEPRECATED,
  PUBLISH,
  SUBSCRIBE,
  REQUIRED,
  GENERATED,
} from '../constants';

export enum BadgeType {
  DEPRECATED = 'deprecated',
  PUBLISH = 'publish',
  SUBSCRIBE = 'subscribe',
  REQUIRED = 'required',
  GENERATED = 'generated',
}

interface Props {
  type: BadgeType;
}

export const Badge: React.FunctionComponent<Props> = ({ type = '' }) => {
  const element = (t: BadgeType, text: string) => (
    <span
      className={`${bemClasses.element(`badge`)} ${bemClasses.modifier(
        t,
        `badge`,
      )}`}
    >
      {text}
    </span>
  );

  switch (type) {
    case BadgeType.DEPRECATED: {
      return element(BadgeType.DEPRECATED, DEPRECATED);
    }
    case BadgeType.PUBLISH: {
      return element(BadgeType.PUBLISH, PUBLISH);
    }
    case BadgeType.SUBSCRIBE: {
      return element(BadgeType.SUBSCRIBE, SUBSCRIBE);
    }
    case BadgeType.REQUIRED: {
      return element(BadgeType.REQUIRED, REQUIRED);
    }
    case BadgeType.GENERATED: {
      return element(BadgeType.GENERATED, GENERATED);
    }
    default: {
      return null;
    }
  }
};
