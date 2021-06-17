const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano')({ preset: 'default' });

const path = require('path');
const fs = require('fs').promises;
const merge = require('deepmerge');

const inputCssFile = path.resolve(__dirname, '../../src/styles/default.css');

function runPostCSS(css, config, from, to) {
  return postcss([tailwindcss(config), autoprefixer, postcssImport, cssnano])
    .process(css, { from, to })
    .then(result => result.css);
}

async function generateTheme({
  outputFile,
  customConfig,
  additionalConfig = {},
}) {
  const defaultConfig = require('./tailwind.config');

  // copy the default config, then merge with custom and at the end with additional config
  let config = merge({}, defaultConfig);
  config = merge(config, customConfig);
  config = merge(config, additionalConfig);

  const inputCss = (await fs.readFile(inputCssFile)).toString();
  const css = await runPostCSS(inputCss, config, inputCssFile, outputFile);

  await fs.writeFile(outputFile, css);
}

async function runScript() {
  // production mode in TailwindCSS for purge the classes
  const isProduction = process.env['NODE_ENV'] === 'production';

  const args = process.argv.slice(2);
  const [to, from] = args;

  const customConfig = from ? require(path.resolve(process.cwd(), from)) : {};
  const outputFile = path.resolve(process.cwd(), to);
  const fileName = path.basename(outputFile);

  // generate theme without preflight (css reset) in TailwindCSS
  await generateTheme({
    outputFile: outputFile.replace(
      fileName,
      fileName.replace('.css', isProduction ? '.min.css' : '.css'),
    ),
    customConfig,
    additionalConfig: {
      corePlugins: {
        preflight: false,
      },
    },
  });

  // generate theme with preflight (css reset) in TailwindCSS
  await generateTheme({
    outputFile: outputFile.replace(
      fileName,
      fileName.replace('.css', isProduction ? '.reset.min.css' : '.min.css'),
    ),
    customConfig,
    additionalConfig: {
      corePlugins: {
        preflight: true,
      },
    },
  });
}

runScript();
