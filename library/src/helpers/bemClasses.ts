class BEMCLasses {
  private prefix: string = '';

  setPrefix(prefix?: string): void {
    if (prefix) {
      this.prefix = prefix;
    }
  }

  element(element: string): string {
    return element ? `${this.prefix}__${element}` : '';
  }

  modifier(modifier: string, element?: string): string {
    return modifier
      ? `${this.prefix}${element ? `__${element}` : ''}--${modifier}`
      : '';
  }

  concatenate(classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }
}

export const bemClasses = new BEMCLasses();
