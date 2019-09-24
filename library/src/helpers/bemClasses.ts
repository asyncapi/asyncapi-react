import { CSS_PREFIX } from '../constants';
import { Identifier } from '../types';
import { toKebabCase } from './toKebabCase';

class BEMCLasses {
  private schemaID: string = CSS_PREFIX;

  getSchemaID(): string {
    return this.schemaID;
  }

  setSchemaID(id?: string): void {
    if (id) {
      this.schemaID = toKebabCase(id);
    }
  }

  element(element: string): string {
    return element ? `${CSS_PREFIX}__${element}` : '';
  }

  modifier(modifier: string, element?: string): string {
    return modifier
      ? `${CSS_PREFIX}${element ? `__${element}` : ''}--${modifier}`
      : '';
  }

  concatenate(classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }

  identifier(identifiers: Array<Identifier | string>): string {
    const id = identifiers
      .map(i => {
        if (this.isIdentifier(i)) {
          if (!i.id) {
            return;
          }
          return i.toKebabCase ? toKebabCase(i.id) : i.id;
        }
        if (!i) {
          return;
        }
        return toKebabCase(i);
      })
      .filter(Boolean)
      .join('--');

    return id.startsWith(this.schemaID) ? id : `${this.schemaID}--${id}`;
  }

  private isIdentifier(v: any): v is Identifier {
    return !!(v as Identifier).id;
  }
}

export const bemClasses = new BEMCLasses();
