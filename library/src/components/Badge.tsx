import React from 'react';

import { bemClasses } from '../helpers';
import {
  DEPRECATED_TEXT,
  PUBLISH_TEXT,
  SUBSCRIBE_TEXT,
  REQUIRED_TEXT,
  GENERATED_TEXT,
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
      return element(BadgeType.DEPRECATED, DEPRECATED_TEXT);
    }
    case BadgeType.PUBLISH: {
      return element(BadgeType.PUBLISH, PUBLISH_TEXT);
    }
    case BadgeType.SUBSCRIBE: {
      return element(BadgeType.SUBSCRIBE, SUBSCRIBE_TEXT);
    }
    case BadgeType.REQUIRED: {
      return element(BadgeType.REQUIRED, REQUIRED_TEXT);
    }
    case BadgeType.GENERATED: {
      return element(BadgeType.GENERATED, GENERATED_TEXT);
    }
    default: {
      return null;
    }
  }
};
