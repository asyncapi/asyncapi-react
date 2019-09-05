import { CSS_PREFIX } from '../constants';

class BEMCLasses {
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
}

export const bemClasses = new BEMCLasses();
