import ZSchema from 'z-schema';
import RefParser from 'json-schema-ref-parser';

import { AsyncApi } from '../types';

class Parser {
  async parse(content: string): Promise<AsyncApi> {
    const parsedContent = this.parseContent(content);

    if (typeof parsedContent !== 'object' || parsedContent === null) {
      throw new Error('Invalid YAML content.');
    }

    const dereferencedJSON = await this.dereference(parsedContent);
    const bundledJSON = await this.bundle(dereferencedJSON);
    const asyncApiSchema = require('asyncapi')[bundledJSON.asyncapi];

    const parsed = await this.validate(bundledJSON, asyncApiSchema);

    return JSON.parse(JSON.stringify(parsed)) as AsyncApi;
  }

  private validator = new ZSchema({});

  private parseContent(content: string) {
    try {
      return JSON.parse(content);
    } catch (e) {
      return require('js-yaml').safeLoad(content);
    }
  };
    
  private async dereference(json: JSON): Promise<any> {
    return RefParser.dereference(json, {
      dereference: {
        circular: 'ignore'
      }
    });
  }
      
  private async bundle(json: JSON): Promise<any> {
    return RefParser.bundle(json, {
      dereference: {
        circular: 'ignore'
      }
    });
  }

  private async validate(json: JSON, schema: string): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
      this.validator.validate(json, schema, (err) => {
        if (err) return reject(err);
        return resolve(json);
      });
    });
  }
}

export const parser = new Parser();
