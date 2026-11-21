import fs from 'fs';
import path from 'path';

describe('package exports', () => {
  const libraryRoot = path.resolve(__dirname, '../..');
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(libraryRoot, 'package.json'), 'utf8'),
  ) as {
    exports: Record<
      string,
      | string
      | {
          types?: string;
          import?: string;
          require?: string;
        }
    >;
  };

  test('exports the default and without-parser entries', () => {
    expect(packageJson.exports['.']).toEqual({
      types: './lib/types/index.d.ts',
      import: './lib/esm/index.js',
      require: './lib/cjs/index.js',
    });
    expect(packageJson.exports['./without-parser']).toEqual({
      types: './lib/types/without-parser.d.ts',
      import: './lib/esm/without-parser.js',
      require: './lib/cjs/without-parser.js',
    });
  });

  test('publishes every declared entry and CSS target', () => {
    const targets = [
      './lib/types/index.d.ts',
      './lib/esm/index.js',
      './lib/cjs/index.js',
      './lib/types/without-parser.d.ts',
      './lib/esm/without-parser.js',
      './lib/cjs/without-parser.js',
      './styles/default.css',
      './styles/default.min.css',
    ];

    targets.forEach((target) => {
      expect(fs.existsSync(path.resolve(libraryRoot, target))).toBe(true);
    });
  });
});
