import ZSchema from 'z-schema';
import RefParser from 'json-schema-ref-parser';

import { AsyncApi } from '../types';

class Parser {
    private validator = new ZSchema({});

    constructor() {}

    private parseContent = (content: string) => {
        try {
            return JSON.parse(content);
        } catch (e) {
            return require('js-yaml').safeLoad(content);
        }
    };
    
    private dereference = async (json: JSON): Promise<any>  => {
      return RefParser.dereference(json, {
        dereference: {
          circular: 'ignore'
        }
      });
    }
      
    private bundle = async (json: JSON): Promise<any> => {
      return RefParser.bundle(json, {
        dereference: {
          circular: 'ignore'
        }
      });
    }

    private validate = async (json: JSON, schema: string) => {
      return new Promise((resolve, reject) => {
        this.validator.validate(json, schema, (err, valid) => {
          if (err) return reject(err);
          return resolve(json);
        });
      });
    }

    public parseText = async (content: string): Promise<AsyncApi> => {
      const parsedContent = this.parseContent(content);

      if (typeof parsedContent !== 'object' || parsedContent === null) {
        throw new Error('Invalid YAML content.');
      }

      const dereferencedJSON = await this.dereference(parsedContent);
      const bundledJSON = await this.bundle(dereferencedJSON);
      const asyncAPIschema = require('asyncapi')[bundledJSON.asyncapi];

      const parsed = await this.validate(bundledJSON, asyncAPIschema);

      return JSON.parse(JSON.stringify(parsed)) as AsyncApi;
    }
}

export const parser = new Parser();
