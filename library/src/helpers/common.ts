import { ConfigInterface } from '../config';
import { OperationInterface } from '@asyncapi/parser';
import { PayloadType } from '../types';
import {
  PUBLISH_LABEL_DEFAULT_TEXT,
  RECEIVE_TEXT_LABEL_DEFAULT_TEXT,
  REPLIER_LABEL_DEFAULT_TEXT,
  REQUEST_LABEL_DEFAULT_TEXT,
  SEND_LABEL_DEFAULT_TEXT,
  SUBSCRIBE_LABEL_DEFAULT_TEXT,
} from '../constants';
export class CommonHelpers {
  static getIdentifier(id: string, config?: ConfigInterface) {
    const schemaID = config?.schemaID;
    if (schemaID) {
      return `${schemaID}-${id}`;
    }
    return id;
  }
  static getOperationType(operation: OperationInterface) {
    if (operation.isSend()) {
      if (operation.reply() !== undefined) {
        return PayloadType.REQUEST;
      } else {
        return PayloadType.SEND;
      }
    }
    if (operation.isReceive()) {
      if (operation.reply() !== undefined) {
        return PayloadType.REPLY;
      }
    }
    return PayloadType.RECEIVE;
  }
  static getOperationIdentifier({
    operation,
    config,
  }: {
    operation: OperationInterface;
    config: ConfigInterface;
  }) {
    if (operation.isSend()) {
      if (operation.reply() !== undefined) {
        return CommonHelpers.getIdentifier(
          `operation-${PayloadType.REQUEST}-${operation.id()}`,
          config,
        );
      } else {
        return CommonHelpers.getIdentifier(
          `operation-${PayloadType.SEND}-${operation.id()}`,
          config,
        );
      }
    }
    if (operation.isReceive()) {
      if (operation.reply() !== undefined) {
        return CommonHelpers.getIdentifier(
          `operation-${PayloadType.REPLY}-${operation.id()}`,
          config,
        );
      }
    }
    return CommonHelpers.getIdentifier(
      `operation-${PayloadType.RECEIVE}-${operation.id()}`,
      config,
    );
  }
  static getOperationDesignInformation({
    type,
    config,
    isAsyncAPIv2,
  }: {
    type: PayloadType;
    config: ConfigInterface;
    isAsyncAPIv2: boolean;
  }): { borderColor: string; typeLabel: string; backgroundColor: string } {
    if (type === PayloadType.RECEIVE) {
      return {
        borderColor: 'border-green-600 text-green-600',
        backgroundColor: 'bg-green-600',
        typeLabel: !isAsyncAPIv2
          ? config.receiveLabel ?? RECEIVE_TEXT_LABEL_DEFAULT_TEXT
          : config.publishLabel ?? PUBLISH_LABEL_DEFAULT_TEXT,
      };
    }
    if (type === PayloadType.REPLY) {
      return {
        borderColor: 'border-orange-600 text-orange-600',
        backgroundColor: 'bg-orange-600',
        typeLabel: config.replyLabel ?? REPLIER_LABEL_DEFAULT_TEXT,
      };
    }
    if (type === PayloadType.REQUEST) {
      return {
        borderColor: 'border-red-600 text-red-600',
        backgroundColor: 'bg-red-600',
        typeLabel: config.requestLabel ?? REQUEST_LABEL_DEFAULT_TEXT,
      };
    }
    return {
      borderColor: 'border-blue-600 text-blue-500',
      backgroundColor: 'bg-blue-600',
      typeLabel: !isAsyncAPIv2
        ? config.sendLabel ?? SEND_LABEL_DEFAULT_TEXT
        : config.subscribeLabel ?? SUBSCRIBE_LABEL_DEFAULT_TEXT,
    };
  }
}
