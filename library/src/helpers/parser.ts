import RefParser from 'json-schema-ref-parser';
import Ajv, { ErrorObject } from 'ajv';

import { AsyncApi } from '../types';

interface ParserReturn {
  data: AsyncApi;
  error?: ErrorObject[] | null;
}

class Parser {
  private validator = this.createValidator();

  async parse(content: string): Promise<ParserReturn> {
    const parsedContent = this.parseContent(content);

    if (typeof parsedContent !== 'object' || parsedContent === null) {
      throw new Error('Invalid YAML content.');
    }

    const dereferencedJSON = await this.dereference(parsedContent);
    const bundledJSON = await this.bundle(dereferencedJSON);
    this.removeNullOrUndefined(bundledJSON);

    const asyncApiSchema = require('asyncapi')[
      bundledJSON.asyncapi === '2.0.0-rc1' ? 'unstable' : bundledJSON.asyncapi
      // for now, coz there's old stuff in rc1
      // todo: delete this after discusion
    ];

    let parsed;
    let err = undefined;
    try {
      err = await this.validate(bundledJSON, asyncApiSchema);
      parsed = bundledJSON;
    } catch (error) {
      console.error(error);
    }

    return {
      data: JSON.parse(JSON.stringify(parsed || {})) as AsyncApi,
      error: err,
    };
  }

  private parseContent(content: string) {
    try {
      return JSON.parse(content);
    } catch (e) {
      return require('js-yaml').safeLoad(content);
    }
  }

  private async dereference(json: JSON): Promise<any> {
    return RefParser.dereference(json, {
      dereference: {
        circular: 'ignore',
      },
    });
  }

  private async bundle(json: JSON): Promise<any> {
    return RefParser.bundle(json, {
      dereference: {
        circular: 'ignore',
      },
    });
  }

  private removeNullOrUndefined(json: JSON): void {
    for (const key in json) {
      if (json[key] === null || json[key] === undefined) {
        delete json[key];
      } else if (typeof json[key] === 'object') {
        this.removeNullOrUndefined(json[key]);
      }
    }
  }

  private createValidator() {
    const validator = new Ajv({
      schemaId: 'auto',
      allErrors: true,
    });
    validator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    return validator;
  }

  private validate(json: JSON, schema: {}): ErrorObject[] | null | undefined {
    const validate = this.validator.compile(schema);
    const valid = validate(json);
    if (!valid) {
      return validate.errors;
    }
    return;
  }
}

export const parser = new Parser();
