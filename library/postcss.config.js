module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' &&
      process.env.MINIFY_STYLES === 'true' &&
      require('cssnano')({
        preset: 'default',
      }),
  ],
};
