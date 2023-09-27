/**
 * Make sure code does not contain properties such as `#property`
 */
module.exports = function(source) {
  return source.replace(/^#! .*\n/, '');
};
