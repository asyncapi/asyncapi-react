const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano')({ preset: 'default' });

const path = require('path');
const fs = require('fs');
const merge = require('deepmerge');
const { Command } = require('commander');

const program = new Command();
program
  .option('-c, --config <file>', 'path to configuration')
  .option('-o, --output <file>', 'destionation of output files');
program.parse(process.argv);
const options = program.opts();

const defaultConfig = require('./tailwind.config');
const customConfig = require(path.resolve(process.cwd(), options.config));
const config = merge(defaultConfig, customConfig);

const inputCssFile = path.resolve(__dirname, '../../src/styles/default.css');
const outputFile = path.resolve(process.cwd(), options.output);

process.env['NODE_ENV'] = 'production';

fs.readFile(inputCssFile, (_, css) => {
  postcss([tailwindcss(config), autoprefixer, postcssImport, cssnano])
    .process(css, {
      from: inputCssFile,
      to: outputFile,
    })
    .then(result => {
      fs.writeFile(outputFile, result.css, () => true);
    });
});
